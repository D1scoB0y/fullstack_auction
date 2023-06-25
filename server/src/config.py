import os

from dotenv import load_dotenv


load_dotenv()


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', '')


class DevelopmentConfig(Config):
    DB_URL = os.environ.get('DEV_DB_URL', '')
    CLIENT_APP_URL = os.environ.get('DEV_CLIENT_APP_URL', '')
    SQL_COMMAND_ECHO = True


class ProductionConfig(Config):
    DB_URL = os.environ.get('PROD_DB_URL', '')
    CLIENT_APP_URL = os.environ.get('PROD_CLIENT_APP_URL', '')
    SQL_COMMAND_ECHO = False


def get_config() -> DevelopmentConfig|ProductionConfig:
    env = os.getenv('DEV_MODE')
    if env == 'true':
        return DevelopmentConfig()
    return ProductionConfig()

config = get_config()
