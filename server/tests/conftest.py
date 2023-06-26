import asyncio
from typing import AsyncGenerator
from httpx import AsyncClient

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.ext.asyncio import (AsyncSession, async_sessionmaker,
                                    create_async_engine)
import src.main as _app
import src.database as _db
from src.config import config


test_async_engine = create_async_engine(config.TEST_DB_URL, echo=False)
test_async_session_maker = async_sessionmaker(test_async_engine, expire_on_commit=False)


async def overriden_get_session() -> AsyncGenerator[AsyncSession, None]:
    async with test_async_session_maker() as session:
        yield session


_app.app.dependency_overrides[_db.get_session] = overriden_get_session


@pytest.fixture(scope='session', autouse=True)
async def create_test_records():

    # Before tests
    async with test_async_engine.begin() as conn:
        await conn.run_sync(_db.Base.metadata.create_all)

    yield

    # After tests
    async with test_async_engine.begin() as conn:
        await conn.run_sync(_db.Base.metadata.drop_all)


@pytest.fixture(scope='session')
def event_loop(request):
    """Create an instance of the default event loop for each test case."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


client = TestClient(_app.app)


@pytest.fixture(scope="session")
async def ac() -> AsyncGenerator[AsyncClient, None]:

    async with AsyncClient(app=_app.app, base_url="http://test") as ac:
        yield ac
