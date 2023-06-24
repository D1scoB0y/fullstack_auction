import sqlalchemy as sa 

from src.config import config


def get_engine(db_url: str|None) -> sa.Engine:
    if db_url is None:
        raise ValueError('db_url is not a valid database url')
    
    return sa.create_engine(db_url)

engine = get_engine(config.SECRET_KEY)


