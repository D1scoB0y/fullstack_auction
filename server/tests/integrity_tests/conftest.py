import random
from typing import AsyncGenerator

import boto3
import pytest
from PIL import Image
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from src.config import config
import src.database as _db
import src.main as _app
import src.user.schemas as _user_schemas
import src.user.service as _user_service
import src.user.models as _user_models
import src.user.user_getters as _user_getters
import src.user.security as _user_security
import src.auction.yandex_cloud_service as _cloud_service


test_async_engine = create_async_engine(config.DB_URL, echo=False)
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
async def create_user(test_user, client) -> None:
    test_user = test_user()
    test_user.pop('phoneNumber')
    credentials = _user_schemas.RegistrationUser(**test_user)

    async with test_async_session_maker() as session:

        await _user_service.create_user(
            credentials,
            session,
            client,
        )


@pytest.fixture(scope='class')
async def add_phone(test_user) -> None:
    user_data = test_user()

    del user_data['password']

    async with test_async_session_maker() as session:
        user = await _user_getters.get_user_by_email(user_data['email'], session)

        if user is None:
            raise ValueError('Username is not found')

        user_data = _user_schemas.UpdateUser(**user_data)

        await _user_service.update_user(
            user_data,
            user,
            session,
        )


@pytest.fixture(scope='class')
async def create_seller(test_user) -> None:
    user_data = test_user()
    user_data.pop('phoneNumber')
    hashed_password = _user_security.hash_password(user_data.pop('password'))

    async with test_async_session_maker() as session:
        seller = _user_models.User(
            **user_data,
            is_seller=True,
            password=hashed_password,
        )

        session.add(seller)
        await session.commit()


@pytest.fixture(scope='class')
async def token(test_user) -> str:
    test_user = test_user()

    credentials = _user_schemas.LoginUser(
        email=test_user['email'],
        password=test_user['password'],
        recaptcha_token=None    # type: ignore
    )

    async with test_async_session_maker() as session:
        token = await _user_service.get_token(
            credentials,
            session,
        )

    return token


@pytest.fixture(scope='session')
async def test_images(tmp_path_factory):
    images = []
    allowed_extensions = ['png', 'jpg', 'bmp']

    for image_index in range(random.randrange(1, 13)):
        img = f"{image_index}.{random.choice(allowed_extensions)}"
        test_dir = tmp_path_factory.mktemp("data") / img
        Image.new("RGB", size=(1, 1)).save(test_dir)
        images.append(test_dir)

    return images


@pytest.fixture(scope='class')
async def create_bucket():
    client = await _cloud_service._get_aws_client()
    client.create_bucket(
        ACL='public-read',
        Bucket=config.YOS_BUCKET,
    )

    yield

    s3 = boto3.resource('s3', endpoint_url="https://storage.yandexcloud.net")
    bucket = s3.Bucket(config.YOS_BUCKET)  # type: ignore
    bucket.object_versions.delete()
    bucket.delete()
