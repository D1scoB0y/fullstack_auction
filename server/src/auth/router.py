from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.schemas import AuthUserSchema, ReadUserSchema, RegistrationUserSchema
from src.auth.service import auth_user, create_user
from src.database import get_session


router = APIRouter(prefix='/auth', tags=['Authentication'])


@router.post('/login', response_model=ReadUserSchema)
async def login_path(
        credentials: AuthUserSchema,
        session: AsyncSession = Depends(get_session),
    ):
    return await auth_user(credentials, session)


@router.post('/registration', response_model=ReadUserSchema)
async def registration_path(
        credentials: RegistrationUserSchema,
        session: AsyncSession = Depends(get_session),
    ):
    return await create_user(credentials, session)
