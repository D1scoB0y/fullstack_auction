from fastapi import APIRouter, BackgroundTasks, Depends
from fastapi_mail import FastMail
from sqlalchemy.ext.asyncio import AsyncSession

import src.mail_client as _mail
import src.database as _db
import src.auth.schemas as _auth_schemas
import src.auth.service as _auth_service


router = APIRouter(prefix='/auth', tags=['Authentication'])


@router.post('/login', response_model=_auth_schemas.ReadUserSchema)
async def login_path(
        credentials: _auth_schemas.AuthUserSchema,
        session: AsyncSession = Depends(_db.get_session),
    ):
    return await _auth_service.auth_user(credentials, session)


@router.post('/registration', response_model=_auth_schemas.ReadUserSchema)
async def registration_path(
        credentials: _auth_schemas.RegistrationUserSchema,
        session: AsyncSession = Depends(_db.get_session),
    ):
    return await _auth_service.create_user(credentials, session)


@router.post('/get-email-verif-link')
async def send_email_verif_link_path(
        email: str,
        background_tasks: BackgroundTasks,
        mail_client: FastMail = Depends(_mail.get_mail_client),
        session: AsyncSession = Depends(_db.get_session),
    ):
    return await _auth_service.send_email_verif_link(email, mail_client, session, background_tasks)


@router.get('/check-email-verif-link')
async def check_email_verif_link_path(
        token: str,
        session: AsyncSession = Depends(_db.get_session)
    ):
    user = await _auth_service.parse_email_verif_token(token, session)

    if user is not None and not user.email_is_verified: # type: ignore
        user.email_is_verified = True # type: ignore
        await session.commit()
        await session.refresh(user)
        return _auth_schemas.ReadUserSchema.from_orm(user)
