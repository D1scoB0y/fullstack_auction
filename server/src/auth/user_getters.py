from fastapi import HTTPException, Depends
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession

import src.database as _db
import src.auth.models as _auth_models
import src.auth.schemas as _auth_schemas
import src.auth.security as _auth_security
import src.auth.user_getters as _auth_user_getters


async def get_user_by_id(
        id: int,
        session: AsyncSession
    ) -> _auth_models.User | None:

    return await session.get(_auth_models.User, id)


async def get_user_by_email(
        email: str,
        session: AsyncSession
    ) -> _auth_models.User | None:

    res = await session.execute(
        select(_auth_models.User).where(_auth_models.User.email==email)
    )

    return res.scalar()


async def get_user_by_username(
        username: str,
        session: AsyncSession
    ) -> _auth_models.User | None:

    res = await session.execute(
        select(_auth_models.User).where(_auth_models.User.username==username)
    )

    return res.scalar()


async def get_user_by_phone_number(
        phone_number: str,
        session: AsyncSession
    ) -> _auth_models.User | None:

    res = await session.execute(
        select(_auth_models.User).where(_auth_models.User.phone_number==phone_number)
    )

    return res.scalar()


async def get_user_by_token(
        token: str,
        session: AsyncSession
    ) -> _auth_models.User:

    payload = await _auth_security.parse_jwt(token)
    id = payload['id']

    user = await get_user_by_id(id, session)

    if user is None:
        raise HTTPException(status_code=401, detail='Invalid token')

    return user


async def get_current_user(
        token = Depends(_auth_schemas.oauth2schema),
        session: AsyncSession = Depends(_db.get_session),
    ) -> _auth_models.User:
    
    return await _auth_user_getters.get_user_by_token(token, session)
