from fastapi import Depends, APIRouter
from sqlalchemy.ext.asyncio import AsyncSession

import src.database as _db
import src.auth.schemas as _auth_schemas
import src.auth.service as _auth_service
import src.auth.mail.router as _mail_module


# Router
router = APIRouter(prefix='/auth')

# Nested routers
router.include_router(_mail_module.router)


@router.post('/login', response_model=_auth_schemas.ReadUserSchema, tags=['Authentication'])
async def login_path(
        credentials: _auth_schemas.AuthUserSchema,
        session: AsyncSession = Depends(_db.get_session),
    ):
    '''Logging by credentials (email: str, password: str)'''

    return await _auth_service.auth_user(credentials, session)


@router.post('/registration', response_model=_auth_schemas.ReadUserSchema, tags=['Authentication'])
async def registration_path(
        credentials: _auth_schemas.RegistrationUserSchema,
        session: AsyncSession = Depends(_db.get_session),
    ):
    '''Creating user with credentials (email: str, password: str)'''

    return await _auth_service.create_user(credentials, session)
