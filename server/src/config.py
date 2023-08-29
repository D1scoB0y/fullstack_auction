from typing import Optional

from pydantic import BaseSettings


class BaseConfig(BaseSettings):

    SECRET_KEY: str
    DEV_MODE: str

    class Config:
        env_file = 'dev.env'


class Config(BaseConfig):

    DB_URL: Optional[str]
    TEST_DB_URL: Optional[str]

    CLIENT_ORIGIN: Optional[str]

    MAIL_SENDER: Optional[str]
    MAIL_PASSWORD: Optional[str]

    PHONE_SERVICE_API_KEY: Optional[str]
    PHONE_SERVICE_COMPAIGN_ID: Optional[str]

    class Config:
        env_file = 'dev.env' if BaseConfig().DEV_MODE == 'true' else 'prod.env' # type: ignore


config = Config() # type: ignore
