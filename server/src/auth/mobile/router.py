import time

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

import src.database as _db
import src.auth.mobile.service as _mobile_service
import src.auth.security as _auth_security
import src.auth.models as _auth_models
import src.auth.user_getters as _auth_user_getters
import src.redis_client as _redis


router = APIRouter(prefix='/mobile')


@router.get('/verification-call-request', status_code=204, tags=['Phone number verification'])
async def verification_call_request(
        user: _auth_models.User = Depends(_auth_user_getters.get_current_user),
        session: AsyncSession = Depends(_db.get_session)
    ):

    if user.phone_number is None:
        raise HTTPException(status_code=400, detail='User does not set their phone number')

    # Получаем время последнего запроса
    last_request = _redis.client.get(user.phone_number)

    if last_request:

        # Если последний запрос был меньше 60с назад, бросаем 429
        if time.time() - float(last_request) < 120: # type: ignore
            raise HTTPException(status_code=429, detail='Too frequent verification requests')

    # Verification code (it will be last 4 digits of bot's phone number)
    verif_code = await _auth_security.generate_4_digit_code()

    await _mobile_service.verification_call(user.phone_number, verif_code)

    user.phone_number_verif_code = verif_code
    await session.commit()

    # Сохраняем время текущего запроса
    _redis.client.set(user.phone_number, time.time())


@router.get('/validate-verification-code', status_code=204, tags=['Phone number verification'])
async def validate_verification_code(
        verif_code: int,
        user: _auth_models.User = Depends(_auth_user_getters.get_current_user),
        session: AsyncSession = Depends(_db.get_session)
    ) -> None:

    if user is None:
        raise HTTPException(status_code=404, detail='Invalid token')

    if verif_code != user.phone_number_verif_code:
        raise HTTPException(status_code=400, detail='Phone number verification code is wrong')

    user.phone_number_is_verified = True
    user.phone_number_verif_code = None
    await session.commit()

    # Удаляем информацию из redis о времени последнего запроса на звонок
    _redis.client.delete(user.phone_number)
