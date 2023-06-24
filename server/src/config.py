import os

from dotenv import load_dotenv


load_dotenv()


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')


class DevelopmentConfig(Config):
    DB_URL = os.environ.get('DEV_DB_URL')


class ProductionConfig(Config):
    DB_URL = os.environ.get('PROD_DB_URL')


def get_config() -> Config:
    env = os.getenv('DEV_MODE')
    if env == 'true':
        return DevelopmentConfig()
    return ProductionConfig()

config = get_config()
