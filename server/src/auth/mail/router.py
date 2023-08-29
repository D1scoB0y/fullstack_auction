import time
from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

import src.database as _db
import src.auth.security as _auth_security
import src.auth.models as _auth_models
import src.auth.mail.client as _mail_client
import src.auth.user_getters as _auth_user_getters
import src.redis_client as _redis


router = APIRouter(prefix='/mail')


@router.get('/verification-message-request', status_code=204, tags=['Email verification'])
async def verification_message_request_path(
        bg_tasks: BackgroundTasks,
        user: _auth_models.User = Depends(_auth_user_getters.get_current_user),
    ):
    '''Request to send an email with an email verification link'''

    # Получаем время последнего запроса
    last_request = _redis.client.get(user.email)

    if last_request:

        # Если последний запрос был меньше 60с назад, бросаем 429
        if time.time() - float(last_request) < 60: #type: ignore
            raise HTTPException(status_code=429, detail='Too frequent verification requests')
    

    if user.email_is_verified:
        raise HTTPException(status_code=409, detail='User\'s email is already verified')

    token = await _auth_security.generate_jwt({'email': user.email})

    await _mail_client.mail_client.send_message(
        await _mail_client.mail_client.generate_verification_message(
            user.username,
            user.email,
            token,
        ),
        bg_tasks,
    )

    # Сохраняем время текущего запроса
    _redis.client.set(user.email, time.time())


@router.get('/validate-verification-token', status_code=204,tags=['Email verification'])
async def validate_verification_token_path(
        token: str,
        session: AsyncSession = Depends(_db.get_session),
    ):
    '''Checking verification token'''

    payload = await _auth_security.parse_jwt(token)

    email = payload.get('email')

    if email is None:
        raise HTTPException(status_code=400, detail='Invalid token')

    user = await _auth_user_getters.get_user_by_email(email, session)

    if user is None:
        raise HTTPException(status_code=404, detail='User with this email does not exist')

    user.email_is_verified = True
    await session.commit()
    await session.refresh(user)

    # Удаляем информацию из redis о времени последнего запроса на отправку письма
    _redis.client.delete(user.email)
