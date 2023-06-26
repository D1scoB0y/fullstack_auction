import jwt
from fastapi import HTTPException
from fastapi_mail import FastMail, MessageSchema, MessageType
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.config import config
import src.auth.models as _auth_models
import src.auth.schemas as _auth_schemas
import src.auth.security as _auth_security


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


async def auth_user(
        credentials: _auth_schemas.AuthUserSchema,
        session: AsyncSession
    ) -> _auth_schemas.ReadUserSchema | None:

    user = await get_user_by_email(credentials.email, session)

    # If user is not exist
    if user is None:
        raise HTTPException(status_code=401, detail='Invalid credentials')

    # If password is wrong
    if not await _auth_security.check_password(credentials.password, str(user.password)):
        raise HTTPException(status_code=401, detail='Invalid credentials')

    return _auth_schemas.ReadUserSchema.from_orm(user)


async def valid_registration_credentials(
        credentials: _auth_schemas.RegistrationUserSchema,
        session: AsyncSession
    ) -> None:

    if await get_user_by_email(credentials.email, session) is not None:
        raise HTTPException(status_code=409, detail='Email is already taken')
    
    elif await get_user_by_phone_number(credentials.phone_number, session) is not None:
        raise HTTPException(status_code=409, detail='Phone number is already taken')
    
    elif await get_user_by_username(credentials.username, session) is not None:
        raise HTTPException(status_code=409, detail='Username is already taken')


async def create_user(
        credentials: _auth_schemas.RegistrationUserSchema,
        session: AsyncSession
    ) -> _auth_schemas.ReadUserSchema | None:

    await valid_registration_credentials(credentials, session)

    new_user = _auth_models.User(**credentials.dict())

    new_user.password = await _auth_security.hash_password(credentials.password) # type: ignore

    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)

    return _auth_schemas.ReadUserSchema.from_orm(new_user)


async def send_email_verif_link(
        email: str,
        mail_client: FastMail,
        session: AsyncSession
    ) -> str:

    user = await get_user_by_email(email, session)

    if user is None:
        raise HTTPException(status_code=401, detail='Email does not exist')

    verif_token = jwt.encode({'email': email}, config.SECRET_KEY, algorithm="HS256")

    message = MessageSchema(
        recipients=[email], # type: ignore
        subject='Подтвердите почту для FotoJager`s Auctions',
        body=f'''Перейдите по ссылке для подтверджения адреса электронной почты:
            http://localhost:8000/auth/check-email-verif-link?token={verif_token}''',
        subtype=MessageType.plain,
    )

    await mail_client.send_message(message)

    return verif_token


async def parse_email_verif_token(
        token: str,
        session: AsyncSession
    ) -> _auth_models.User | None:

    try:
        payload = jwt.decode(token, config.SECRET_KEY, algorithms=['HS256'])
        user = await get_user_by_email(payload['email'], session)
    except:
        raise HTTPException(status_code=401, detail='Invalid token')

    return user
