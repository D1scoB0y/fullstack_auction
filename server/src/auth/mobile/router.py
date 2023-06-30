from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

import src.database as _db
import src.auth.service as _auth_service
import src.auth.mobile.service as _mobile_service
import src.auth.security as _auth_security


router = APIRouter(prefix='/mobile')


@router.post('/verification-call-request', tags=['Phone number verification'])
async def verification_call_request(
        phone_number: str,
        session: AsyncSession = Depends(_db.get_session)
    ):
    user = await _auth_service.get_user_by_phone_number(phone_number, session)

    if user is None:
        raise HTTPException(status_code=404, detail=f'User with id: {id}, does not exist')

    # Verification code (it will be last 4 digits of bot's phone number)
    verif_code = await _auth_security.generate_4_digit_code()

    await _mobile_service.verification_call(user.phone_number, verif_code)

    user.phone_number_verif_code = verif_code
    await session.commit()

    return verif_code


@router.post('/validate-verification-code', tags=['Phone number verification'])
async def validate_verification_code(
        phone_number: str,
        verif_code: int,
        session: AsyncSession = Depends(_db.get_session)
    ) -> None:
    user = await _auth_service.get_user_by_phone_number(phone_number, session)

    if user is None:
        raise HTTPException(status_code=404, detail=f'User with id: {id}, does not exist')

    if verif_code != user.phone_number_verif_code:
        raise HTTPException(status_code=400, detail='Phone number verification code is wrong')

    user.phone_number_is_verified = True
    await session.commit()
