import os

from dotenv import load_dotenv


load_dotenv()


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', '')


class DevelopmentConfig(Config):

    # Database url
    DB_URL = os.getenv('DEV_DB_URL', '')
    TEST_DB_URL = os.getenv('TEST_DB_URL', '')

    SQL_COMMAND_ECHO = True

    # Frontend app url
    CLIENT_APP_URL = os.getenv('DEV_CLIENT_APP_URL', '')

    # SMTP user
    SMTP_USER = os.getenv('DEV_SMTP_USER', '')

    # SMTP password
    SMTP_PASSWORD = os.getenv('DEV_SMTP_PASSWORD', '')

    # Celery broker url
    CELERY_BROKER_URL = os.getenv('DEV_CELERY_BROKER_URL', '')



class ProductionConfig(Config):

    # Database url
    DB_URL = os.getenv('PROD_DB_URL', '')
    TEST_DB_URL = ""

    SQL_COMMAND_ECHO = False

    # Frontend app url
    CLIENT_APP_URL = os.getenv('PROD_CLIENT_APP_URL', '')

    # SMTP user
    SMTP_USER = os.getenv('PROD_SMTP_USER', '')

    # SMTP password
    SMTP_PASSWORD = os.getenv('PROD_SMTP_PASSWORD', '')

    # Celery broker url
    CELERY_BROKER_URL = os.getenv('PROD_CELERY_BROKER_URL', '')


def get_config() -> DevelopmentConfig|ProductionConfig:
    dev_mode = os.getenv('DEV_MODE')
    if dev_mode == 'true':
        return DevelopmentConfig()
    return ProductionConfig()

config = get_config()
