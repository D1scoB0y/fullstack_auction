from typing import AsyncGenerator

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.asyncio import create_async_engine, AsyncEngine, AsyncSession, async_sessionmaker

from src.config import config


Base = declarative_base()


def get_async_engine(db_url: str|None) -> AsyncEngine:
    if db_url is None:
        raise ValueError('db_url is not a valid database url')
    
    return create_async_engine(db_url, echo=config.SQL_COMMAND_ECHO)


async_engine = get_async_engine(config.DB_URL)

async_session_maker = async_sessionmaker(async_engine, expire_on_commit=False)


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session
