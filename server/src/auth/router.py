from fastapi import Depends, APIRouter, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

import src.database as _db
import src.auth.schemas as _auth_schemas
import src.auth.service as _auth_service
import src.auth.models as _auth_models
import src.auth.security as _auth_security

import src.auth.mail.router as _mail_module
import src.auth.mobile.router as _mobile_module
import src.auth.reset_password.router as _reset_password_module


# Router
router = APIRouter(prefix='/auth')

# Nested routers
router.include_router(_mail_module.router)
router.include_router(_mobile_module.router)
router.include_router(_reset_password_module.router)


@router.post('/login', response_model=str, tags=['Authentication'])
async def login_path(
        credentials: OAuth2PasswordRequestForm = Depends(),
        session: AsyncSession = Depends(_db.get_session),
    ):
    '''Logging by credentials (email: str, password: str)'''

    return await _auth_service.auth_user(credentials, session)


@router.post('/registration', response_model=str, tags=['Authentication'])
async def registration_path(
        credentials: _auth_schemas.RegistrationUserSchema,
        session: AsyncSession = Depends(_db.get_session),
    ):
    return await _auth_service.create_user(credentials, session)


@router.put('/update-user', status_code=204, tags=['Update user'])
async def update_user_path(
        user_data: _auth_schemas.UpdateUserSchema,
        user: _auth_models.User = Depends(_auth_service.get_current_user),
        session: AsyncSession = Depends(_db.get_session),
    ):

    if not await _auth_security.check_password(user_data.password, user.password): # type: ignore
        raise HTTPException(status_code=401, detail='Wrong password')
    
    if user_data.email != user.email:
        user.email_is_verified = False # type: ignore

    if user_data.phone_number != user.phone_number:
        user.phone_number_is_verified = False # type: ignore

    user.username = user_data.username # type: ignore
    user.email = user_data.email # type: ignore
    user.phone_number = user_data.phone_number # type: ignore

    await session.commit()


@router.patch('/change-password', status_code=204, tags=['Update user'])
async def change_password_path(
        data: _auth_schemas.ChangePasswordSchema,
        user: _auth_models.User = Depends(_auth_service.get_current_user),
        session: AsyncSession = Depends(_db.get_session),
    ):

    if not await _auth_security.check_password(data.current_password, user.password): # type: ignore
        raise HTTPException(status_code=401, detail='Wrong password')
    
    user.password = await _auth_security.hash_password(data.new_password) # type: ignore

    await session.commit()


@router.get('/get-user', response_model=_auth_schemas.ReadUserSchema, tags=['Authentication'])
async def get_user_path(
        user: _auth_models.User = Depends(_auth_service.get_current_user),
    ):
    return _auth_schemas.ReadUserSchema.from_orm(user)


@router.get('/check-username', status_code=204, tags=['User data cheking'])
async def check_username_path(
    username: str,
    session: AsyncSession = Depends(_db.get_session)
    ):
    '''Checks that given username is unique'''

    user = await _auth_service.get_user_by_username(username, session)

    if user:
        raise HTTPException(status_code=409, detail='Username is already taken')


@router.get('/check-email', status_code=204, tags=['User data cheking'])
async def check_email_path(
    email: str,
    session: AsyncSession = Depends(_db.get_session)
    ):
    '''Checks that given email is unique'''

    user = await _auth_service.get_user_by_email(email, session)

    if user:
        raise HTTPException(status_code=409, detail='Email is already taken')


@router.get('/check-phone', status_code=204, tags=['User data cheking'])
async def check_phone_path(
    phone_number: str,
    session: AsyncSession = Depends(_db.get_session)
    ):
    '''Checks that given phone number is unique'''

    phone_number = phone_number.replace(' ', '')

    user = await _auth_service.get_user_by_phone_number(phone_number, session)

    if user:
        raise HTTPException(status_code=409, detail='Phone number is already taken')
