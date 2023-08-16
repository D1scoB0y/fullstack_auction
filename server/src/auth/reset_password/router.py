import time

from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession

import src.database as _db
import src.auth.service as _auth_service
import src.auth.security as _auth_security
import src.auth.models as _auth_models
import src.auth.reset_password.schemas as _reset_password_schemas
import src.auth.mail.client as _mail_client


router = APIRouter(prefix='/reset-password')


@router.get('/request-password-reset', status_code=204, tags=['Password reset'])
async def request_password_reset_path(
        email: str,
        bg_tasks: BackgroundTasks,
        session: AsyncSession = Depends(_db.get_session),
    ):

    user = await _auth_service.get_user_by_email(email, session)

    if user is None:
        raise HTTPException(status_code=401, detail='Email does not exist')

    token = await _auth_security.generate_jwt({
        'email': user.email,
        'exp': time.time() + (60 * 60 * 24)
    })

    await _mail_client.mail_client.send_message(
        await _mail_client.mail_client.generate_password_reset_message(
            user.username, # type: ignore
            user.email, # type: ignore
            token, # type: ignore
        ),
        bg_tasks,
    )


@router.patch('/reset-password', status_code=204, tags=['Password reset'])
async def reset_password_path(
        reset_password_data: _reset_password_schemas.ResetPasswordSchema,
        session: AsyncSession = Depends(_db.get_session),
    ):

    payload = await _auth_security.parse_jwt(reset_password_data.token)

    if payload['exp'] <= time.time():
        raise HTTPException(status_code=401, detail='Reset password token was expired')
    
    user = await _auth_service.get_user_by_email(payload['email'], session)

    if user is None:
        raise HTTPException(status_code=401, detail='Token is invalid')
    
    user.password = await _auth_security.hash_password(reset_password_data.new_password) # type: ignore

    await session.commit()
