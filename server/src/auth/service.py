import json

from fastapi import HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from google.oauth2 import id_token
from google.auth.transport import requests

import src.auth.models as _auth_models
import src.auth.schemas as _auth_schemas
import src.auth.security as _auth_security
import src.auth.user_getters as _auth_user_getters

from src.config import config


async def auth_user(
        credentials: OAuth2PasswordRequestForm,
        session: AsyncSession,
    ) -> str:

    email = credentials.username    # 'OAuth2PasswordRequestForm' object has no attribute 'email'

    user = await _auth_user_getters.get_user_by_email(email, session)

    if user is None:
        raise HTTPException(status_code=401, detail='Invalid credentials')

    if not await _auth_security.check_password(credentials.password, user.password):
        raise HTTPException(status_code=401, detail='Invalid credentials')

    return await _auth_security.generate_jwt({'id': user.id})


async def create_user(
        credentials: _auth_schemas.RegistrationUserSchema,
        session: AsyncSession
    ) -> str:

    new_user = _auth_models.User(**credentials.dict())

    new_user.password = await _auth_security.hash_password(credentials.password)

    session.add(new_user)

    await session.commit()
    await session.refresh(new_user)

    return await _auth_security.generate_jwt({'id': new_user.id})


async def manage_google_auth(
        google_token: str,
        session: AsyncSession,
    ) -> str:

    try:
        google_user = id_token.verify_oauth2_token(

            google_token,
            requests.Request(),
            config.GOOGLE_OAUTH_CLIENT_ID
        )

    except:
        raise HTTPException(status_code=400, detail='Invalid google token')

    email = google_user.get('email')

    user = await _auth_user_getters.get_user_by_email(email, session) # type: ignore

    if user is None:

        username = google_user.get('given_name')

        return await create_user_with_google(username, email, session)

    return await auth_user_with_google(email, session)
    

async def auth_user_with_google(
        email: str,
        session: AsyncSession,
    ) -> str:

    user = await _auth_user_getters.get_user_by_email(email, session)

    if user is None:
        raise HTTPException(status_code=401, detail='Email does not exist')
    
    return await _auth_security.generate_jwt({'id': user.id})


async def create_user_with_google(
        username: str,
        email: str,
        session: AsyncSession,
    ) -> str:
    
    new_user = _auth_models.User(
        username=username,
        email=email,
    )

    session.add(new_user)

    await session.commit()
    await session.refresh(new_user)

    return await _auth_security.generate_jwt({'id': new_user.id})
