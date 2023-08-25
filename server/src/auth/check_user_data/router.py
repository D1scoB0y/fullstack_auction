from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

import src.database as _db
import src.auth.service as _auth_service
import src.auth.user_getters as _auth_user_getters


# Router
router = APIRouter(prefix='/is-unique')


@router.get('/username', status_code=204, tags=['User data cheking'])
async def check_username_path(
    username: str,
    session: AsyncSession = Depends(_db.get_session)
    ):
    '''Checks that given username is unique'''

    user = await _auth_user_getters.get_user_by_username(username, session)

    if user:
        raise HTTPException(status_code=409, detail='Username is already taken')


@router.get('/email', status_code=204, tags=['User data cheking'])
async def check_email_path(
    email: str,
    session: AsyncSession = Depends(_db.get_session)
    ):
    '''Checks that given email is unique'''

    user = await _auth_user_getters.get_user_by_email(email, session)

    if user:
        raise HTTPException(status_code=409, detail='Email is already taken')


@router.get('/phone', status_code=204, tags=['User data cheking'])
async def check_phone_path(
    phone_number: str,
    session: AsyncSession = Depends(_db.get_session)
    ):
    '''Checks that given phone number is unique'''

    user = await _auth_user_getters.get_user_by_phone_number(phone_number, session)

    if user:
        raise HTTPException(status_code=409, detail='Phone number is already taken')
