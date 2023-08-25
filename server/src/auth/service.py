import httpx
from fastapi import HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

import src.auth.models as _auth_models
import src.auth.schemas as _auth_schemas
import src.auth.security as _auth_security
import src.auth.user_getters as _auth_user_getters


async def auth_user(
        credentials: OAuth2PasswordRequestForm,
        session: AsyncSession,
    ) -> str:

    email = credentials.username    # 'OAuth2PasswordRequestForm' object has no attribute 'email'

    user = await _auth_user_getters.get_user_by_email(email, session)

    if user is None:
        raise HTTPException(status_code=401, detail='Invalid credentials')

    if user.password is None:
        raise HTTPException(status_code=401, detail='User was created with google and doesnt have password')
                                                                                            
    if not await _auth_security.check_password(credentials.password, user.password):
        raise HTTPException(status_code=401, detail='Invalid credentials')

    return await _auth_security.generate_jwt({'id': user.id})


async def is_credentials_unique(
        credentials: _auth_schemas.RegistrationUserSchema,
        session: AsyncSession,
    ) -> bool:

    user = await _auth_user_getters.get_user_by_username(credentials.username, session)

    if user is not None:
        return False
    
    user = await _auth_user_getters.get_user_by_email(credentials.email, session)

    if user is not None:
        return False
    
    return True


async def create_user(
        credentials: _auth_schemas.RegistrationUserSchema,
        session: AsyncSession,
    ) -> str:

    if not await is_credentials_unique(credentials, session):
        raise HTTPException(status_code=409, detail='Some user data is not unique')

    new_user = _auth_models.User(**credentials.dict())

    new_user.password = await _auth_security.hash_password(credentials.password)

    session.add(new_user)

    await session.commit()
    await session.refresh(new_user)

    return await _auth_security.generate_jwt({'id': new_user.id})


async def update_user(
        user_data: _auth_schemas.UpdateUserSchema,
        user: _auth_models.User,
        session: AsyncSession,
    ) -> None:

    if user_data.email != user.email:
        user.email_is_verified = False

    if user_data.phone_number != user.phone_number:
        user.phone_number_is_verified = False

    user.username = user_data.username
    user.email = user_data.email
    user.phone_number = user_data.phone_number

    await session.commit()


async def get_user_data_from_google(
        access_token: str
    ):

    headers = {
        'Authorization': f'Bearer {access_token}',
        'Accept': 'application/json'
    }

    res = httpx.get(

        f'https://www.googleapis.com/oauth2/v1/userinfo?access_token={access_token}',

        headers=headers,
    )

    return res.json()


async def manage_google_auth(
        google_access_token: str,
        session: AsyncSession,
    ) -> str:

    google_user_data = await get_user_data_from_google(google_access_token)

    email = google_user_data.get('email')

    user = await _auth_user_getters.get_user_by_email(email, session) # type: ignore

    if user is None:

        username = google_user_data.get('given_name')

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
        created_via_google=True,
    )

    session.add(new_user)

    await session.commit()
    await session.refresh(new_user)

    return await _auth_security.generate_jwt({'id': new_user.id})
