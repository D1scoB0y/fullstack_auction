from typing import AsyncGenerator

import pytest
import src.auth.service as _auth_service
import src.database as _db
import src.main as _app
from fastapi.security import OAuth2PasswordRequestForm
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import (AsyncSession, async_sessionmaker,
                                    create_async_engine)
from src.config import config


test_async_engine = create_async_engine(config.TEST_DB_URL, echo=False)
test_async_session_maker = async_sessionmaker(test_async_engine, expire_on_commit=False)


async def overriden_get_session() -> AsyncGenerator[AsyncSession, None]:
    async with test_async_session_maker() as session:
        yield session


_app.app.dependency_overrides[_db.get_session] = overriden_get_session


@pytest.fixture(scope="session")
async def client() -> AsyncGenerator[AsyncClient, None]:

    async with AsyncClient(app=_app.app, base_url="http://test") as ac:
        yield ac


@pytest.fixture(scope="session")
def test_user() -> dict:
    return {
        'username': 'DiscoBoy',
        'email': 'fake@example.com',
        'password': 'test_password'
    }


@pytest.fixture(scope='class')
async def token(test_user: dict) -> str:

    async with test_async_session_maker() as session:

        credentials = OAuth2PasswordRequestForm(
            grant_type='',
            username=test_user["email"],
            password=test_user["password"],
            client_id='',
            scope='',
            client_secret='',
        )

        token = await _auth_service.auth_user(
            credentials,
            session,
        )

        return token


