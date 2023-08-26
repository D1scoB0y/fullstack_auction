from typing import AsyncGenerator

import pytest
import src.auth.schemas as _auth_schemas
import src.auth.service as _auth_service
import src.database as _db
import src.main as _app
from fastapi.security import OAuth2PasswordRequestForm
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from src.config import config
import src.auth.user_getters as _user_getters


from dotenv import load_dotenv

from os import environ

load_dotenv()

if config.TEST_DB_URL:
    test_db_url = config.TEST_DB_URL
else:
    test_db_url = environ.get('TEST_DB_URL')


test_async_engine = create_async_engine(config.TEST_DB_URL, echo=False)
test_async_session_maker = async_sessionmaker(test_async_engine, expire_on_commit=False)


@pytest.fixture(scope="session")
async def client() -> AsyncGenerator[AsyncClient, None]:

    async with AsyncClient(app=_app.app, base_url="http://test") as ac:
        yield ac


@pytest.fixture(scope='class')
async def create_tables():

    async with test_async_engine.begin() as conn:
        await conn.run_sync(_db.Base.metadata.create_all)

    yield

    async with test_async_engine.begin() as conn:
        await conn.run_sync(_db.Base.metadata.drop_all)


@pytest.fixture(scope='session')
async def test_user_for_fixtures() -> dict:
    return {
        'username': 'DiscoBoy',
        'email': 'fake@example.com',
        'phoneNumber': '+79999999999',
        'password': 'strong_password'
    }


@pytest.fixture
async def test_user(test_user_for_fixtures: dict) -> dict:
    return test_user_for_fixtures.copy()


@pytest.fixture(scope='class')
async def create_user(test_user_for_fixtures: dict) -> None:

    test_user = test_user_for_fixtures.copy()

    test_user.pop('phoneNumber')

    credentials = _auth_schemas.RegistrationUserSchema(**test_user)

    async with test_async_session_maker() as session:

        await _auth_service.create_user(
            credentials,
            session,
        )


@pytest.fixture(scope='class')
async def token(test_user_for_fixtures: dict) -> str:

    credentials = OAuth2PasswordRequestForm(
        username=test_user_for_fixtures['email'],
        password=test_user_for_fixtures['password'],
        client_id='',
        client_secret='',
        scope='',
        grant_type='',
    )

    async with test_async_session_maker() as session:

        token = await _auth_service.auth_user(
            credentials,
            session,
        )

    return token


@pytest.fixture(scope='class')
async def add_phone(test_user_for_fixtures: dict) -> None:

    user_data = test_user_for_fixtures.copy()

    del user_data['password']

    async with test_async_session_maker() as session:

        user = await _user_getters.get_user_by_email(test_user_for_fixtures['email'], session)

        if user is None:
            raise ValueError('Username is not found')

        user_data = _auth_schemas.UpdateUserSchema(**user_data)

        await _auth_service.update_user(
            user_data,
            user,
            session,
        )
