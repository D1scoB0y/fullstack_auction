from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

import src.database as _db
import src.auth.service as _auth_service
import src.auth.mobile.service as _mobile_service
import src.auth.security as _auth_security
import src.auth.models as _auth_models

router = APIRouter(prefix='/mobile')


@router.get('/verification-call-request', status_code=204, tags=['Phone number verification'])
async def verification_call_request(
        user: _auth_models.User = Depends(_auth_service.get_current_user),
        session: AsyncSession = Depends(_db.get_session)
    ):

    if user.phone_number is None:
        raise HTTPException(status_code=400, detail='User does not set their phone number')

    # Verification code (it will be last 4 digits of bot's phone number)
    verif_code = await _auth_security.generate_4_digit_code()

    await _mobile_service.verification_call(user.phone_number, verif_code)

    user.phone_number_verif_code = verif_code
    await session.commit()


@router.get('/validate-verification-code', status_code=204, tags=['Phone number verification'])
async def validate_verification_code(
        verif_code: int,
        user: _auth_models.User = Depends(_auth_service.get_current_user),
        session: AsyncSession = Depends(_db.get_session)
    ) -> None:

    if user is None:
        raise HTTPException(status_code=404, detail='Invalid token')

    if verif_code != user.phone_number_verif_code:
        raise HTTPException(status_code=400, detail='Phone number verification code is wrong')

    user.phone_number_is_verified = True
    user.phone_number_verif_code = None
    await session.commit()
