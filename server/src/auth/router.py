import json

from fastapi import Depends, APIRouter, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

import src.database as _db
import src.auth.schemas as _auth_schemas
import src.auth.service as _auth_service
import src.auth.models as _auth_models
import src.auth.security as _auth_security
import src.auth.user_getters as _auth_user_getters
import src.auth.mail.router as _mail_module
import src.auth.mobile.router as _mobile_module
import src.auth.reset_password.router as _reset_password_module
import src.auth.check_user_data.router as _check_user_data_module


# Router
router = APIRouter(prefix='/auth')

# Nested routers
router.include_router(_mail_module.router)
router.include_router(_mobile_module.router)
router.include_router(_reset_password_module.router)
router.include_router(_check_user_data_module.router)


@router.post('/login', response_model=str, tags=['Authentication'])
async def login_path(
        credentials: OAuth2PasswordRequestForm = Depends(),
        session: AsyncSession = Depends(_db.get_session),
    ):
    '''Logging by credentials (email: str, password: str)'''

    return await _auth_service.auth_user(credentials, session)


@router.post('/google-auth', tags=['Authentication'])
async def login_with_google_path(
        data: _auth_schemas.LoginWithGoogleSchema,
        session: AsyncSession = Depends(_db.get_session),
    ):

    return await _auth_service.manage_google_auth(data.token, session)


@router.post('/registration', response_model=str, tags=['Authentication'])
async def registration_path(
        credentials: _auth_schemas.RegistrationUserSchema,
        session: AsyncSession = Depends(_db.get_session),
    ):
    return await _auth_service.create_user(credentials, session)


@router.put('/update-user', status_code=204, tags=['Update user'])
async def update_user_path(
        user_data: _auth_schemas.UpdateUserSchema,
        user: _auth_models.User = Depends(_auth_user_getters.get_current_user),
        session: AsyncSession = Depends(_db.get_session),
    ):
    
    await _auth_service.update_user(user_data, user, session)


@router.patch('/change-password', status_code=204, tags=['Update user'])
async def change_password_path(
        data: _auth_schemas.ChangePasswordSchema,
        user: _auth_models.User = Depends(_auth_user_getters.get_current_user),
        session: AsyncSession = Depends(_db.get_session),
    ):

    if not await _auth_security.check_password(data.current_password, user.password):
        raise HTTPException(status_code=401, detail='Wrong password')
    
    user.password = await _auth_security.hash_password(data.new_password)

    await session.commit()


@router.get('/get-user', tags=['Authentication'])
async def get_user_path(
        user: _auth_models.User = Depends(_auth_user_getters.get_current_user),
    ):
    return json.loads(
            _auth_schemas.ReadUserSchema
                .from_orm(user)
                .json(by_alias=True)
        )
