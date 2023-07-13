from fastapi import Depends, APIRouter
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession

import src.database as _db
import src.auth.schemas as _auth_schemas
import src.auth.service as _auth_service
import src.auth.mail.router as _mail_module
import src.auth.mobile.router as _mobile_module


# Router
router = APIRouter(prefix='/auth')

# Nested routers
router.include_router(_mail_module.router)
router.include_router(_mobile_module.router)


@router.post('/login', response_model=str, tags=['Authentication'])
async def login_path(
        credentials: _auth_schemas.AuthUserSchema,
        session: AsyncSession = Depends(_db.get_session),
    ):
    '''Logging by credentials (email: str, password: str)'''

    return await _auth_service.auth_user(credentials, session)


@router.post('/registration', response_model=str, tags=['Authentication'])
async def registration_path(
        credentials: _auth_schemas.RegistrationUserSchema,
        session: AsyncSession = Depends(_db.get_session),
    ):
    '''Creating user with credentials (email: str, password: str)'''

    return await _auth_service.create_user(credentials, session)


@router.get('/get-user', response_model=_auth_schemas.ReadUserSchema, tags=['Authentication'])
async def get_user_path(
        token: str,
        session: AsyncSession = Depends(_db.get_session)
    ):
    return await _auth_service.get_user_by_token(token, session)


@router.get('/check-username', response_model=bool, tags=['Authentication'])
async def check_username_path(
    username: str,
    session: AsyncSession = Depends(_db.get_session)
    ):
    '''Checks that given username is unique'''

    user = await _auth_service.get_user_by_username(username, session)

    if user is None:
        return JSONResponse(content={}, status_code=200)
    else:
        return JSONResponse(content={}, status_code=409)


@router.get('/check-email', response_model=bool, tags=['Authentication'])
async def check_email_path(
    email: str,
    session: AsyncSession = Depends(_db.get_session)
    ):
    '''Checks that given email is unique'''

    user = await _auth_service.get_user_by_email(email, session)

    if user is None:
        return JSONResponse(content={}, status_code=200)
    else:
        return JSONResponse(content={}, status_code=409)
