import bcrypt
from fastapi import HTTPException
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.models import User
from src.auth.schemas import AuthUserSchema, ReadUserSchema, RegistrationUserSchema


async def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


async def check_password(password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(password.encode(), hashed_password.encode())


async def get_user_by_email(email: str, session: AsyncSession) -> User | None:
    res = await session.execute(
        select(User).where(User.email==email)
    )

    return res.scalar()


async def auth_user(credentials: AuthUserSchema, session: AsyncSession) -> ReadUserSchema | HTTPException:

    user = await get_user_by_email(credentials.email, session)

    # If user is not exist
    if user is None:
        raise HTTPException(status_code=401, detail='Invalid credentials')

    # If password is wrong
    if not await check_password(credentials.password, str(user.password)):
        raise HTTPException(status_code=401, detail='Invalid credentials')

    return ReadUserSchema.from_orm(user)


async def create_user(credentials: RegistrationUserSchema, session: AsyncSession) -> ReadUserSchema | HTTPException:

    # Checking that email is unique
    if await get_user_by_email(credentials.email, session):
        raise HTTPException(status_code=409, detail='Email is already taken')

    new_user = User(
        email=credentials.email,
        password=await hash_password(credentials.password)
    )

    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)

    return ReadUserSchema.from_orm(new_user)
