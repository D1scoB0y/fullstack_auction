import asyncio
import time
from typing import AsyncGenerator

import pytest
import src.database as _db
import src.main as _app
from sqlalchemy.ext.asyncio import (AsyncSession, async_sessionmaker,
                                    create_async_engine)
from src.config import config


test_async_engine = create_async_engine(config.TEST_DB_URL, echo=False) # type: ignore
test_async_session_maker = async_sessionmaker(test_async_engine, expire_on_commit=False)


async def overriden_get_session() -> AsyncGenerator[AsyncSession, None]:
    async with test_async_session_maker() as session:
        yield session


_app.app.dependency_overrides[_db.get_session] = overriden_get_session


@pytest.fixture(scope='session', autouse=True)
async def testing_time():

    start_time = time.time()

    yield

    print(f'\n\nTesting time: {time.time() - start_time}')


@pytest.fixture(scope='session', autouse=True)
def event_loop():
    
    loop = asyncio.get_event_loop_policy().new_event_loop()

    yield loop

    loop.close()


def pytest_addoption(parser):

    parser.addoption(
        '--runslow',
        action="store_true",
        default=False,
    )
