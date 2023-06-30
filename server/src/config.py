from pydantic import BaseSettings


class BaseConfig(BaseSettings):

    SECRET_KEY: str
    DEV_MODE: str

    class Config:
        env_file = '.env.development'


class Config(BaseConfig):

    DB_URL: str
    TEST_DB_URL: str
    CLIENT_ORIGIN: str
    MAIL_SENDER: str
    MAIL_PASSWORD: str
    CELERY_BROKER_URL: str
    PHONE_SERVICE_API_KEY: str
    PHONE_SERVICE_COMPAIGN_ID: str

    class Config:
        env_file = '.env.development' if BaseConfig().DEV_MODE == 'true' else '.env.production'


config = Config()
