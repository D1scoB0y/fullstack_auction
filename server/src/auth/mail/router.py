from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

import src.database as _db
import src.auth.schemas as _auth_schemas
import src.auth.service as _auth_service
import src.auth.security as _auth_security
import src.auth.mail.client as _mail_client


router = APIRouter(prefix='/mail')


@router.post('/verification-message-request', tags=['Email verification'])
async def verification_message_request_path(
        email: str,
        bg_tasks: BackgroundTasks,
        mail_client: _mail_client.MailClient = Depends(_mail_client.get_mail_client),
        session: AsyncSession = Depends(_db.get_session),
    ):
    '''Request to send an email with a email verification link'''

    user = await _auth_service.get_user_by_email(email, session)

    if user is None:
        raise HTTPException(status_code=404, detail='User with this email does not exist')

    if user.email_is_verified: # type: ignore
        raise HTTPException(status_code=409, detail='User\'s email is already verified')

    token = await _auth_security.generate_jwt({'email': user.email})

    await mail_client.send_message(
        await mail_client.generate_verification_message(
            user.username, # type: ignore
            user.email, # type: ignore
            token, # type: ignore
        ),
        bg_tasks,
    )

    return token


@router.get('/validate-verification-token', tags=['Email verification'])
async def validate_verification_token_path(
        token: str,
        session: AsyncSession = Depends(_db.get_session)
    ):
    '''Checking verification token'''

    payload = await _auth_security.parse_jwt(token)

    email = payload.get('email')

    if email is None:
        raise HTTPException(status_code=400, detail='Invalid token')

    user = await _auth_service.get_user_by_email(email, session)

    if user is None:
        raise HTTPException(status_code=404, detail='User with this email does not exist')

    user.email_is_verified = True # type: ignore
    await session.commit()
    await session.refresh(user)
    return _auth_schemas.ReadUserSchema.from_orm(user)
