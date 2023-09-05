import random
from typing import AsyncGenerator

import pytest
from PIL import Image
from httpx import AsyncClient
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from src.config import config
import src.database as _db
import src.main as _app
import src.auth.schemas as _auth_schemas
import src.auth.service as _auth_service
import src.auth.models as _auth_models
import src.auth.user_getters as _user_getters
import src.auth.security as _auth_security


test_async_engine = create_async_engine(config.TEST_DB_URL, echo=False) # type: ignore
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
async def test_user():

    return lambda: {
        'username': 'DiscoBoy',
        'email': 'fake@example.com',
        'phoneNumber': '+7910' + str(random.randint(1111111, 9999999)),
        'password': 'strong_password'
    }


@pytest.fixture(scope='class')
async def create_user(test_user) -> None:

    test_user = test_user()

    test_user.pop('phoneNumber')

    credentials = _auth_schemas.RegistrationUserSchema(**test_user)

    async with test_async_session_maker() as session:

        await _auth_service.create_user(
            credentials,
            session,
        )


@pytest.fixture(scope='class')
async def add_phone(test_user) -> None:

    user_data = test_user()

    del user_data['password']

    async with test_async_session_maker() as session:

        user = await _user_getters.get_user_by_email(user_data['email'], session)

        if user is None:
            raise ValueError('Username is not found')

        user_data = _auth_schemas.UpdateUserSchema(**user_data)

        await _auth_service.update_user(
            user_data,
            user,
            session,
        )


@pytest.fixture(scope='class')
async def create_seller(test_user) -> None:

    user_data = test_user()

    user_data.pop('phoneNumber')

    hashed_password = await _auth_security.hash_password(user_data.pop('password'))

    async with test_async_session_maker() as session:

        seller = _auth_models.User(
            **user_data,
            is_seller=True,
            password=hashed_password,
        )

        session.add(seller)
        await session.commit()


@pytest.fixture(scope='class')
async def token(test_user) -> str:

    test_user = test_user()

    credentials = OAuth2PasswordRequestForm(
        username=test_user['email'],
        password=test_user['password'],
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


@pytest.fixture(scope='session')
async def test_images(tmp_path_factory):

    images = []

    allowed_extensions = ['png', 'jpg', 'bmp']

    for image_index in range(random.randrange(1, 13)):

        dir = tmp_path_factory.mktemp("data") / f"{image_index}.{random.choice(allowed_extensions)}"

        Image.new("RGB", size=(1, 1)).save(dir)

        images.append(dir)

    return images
