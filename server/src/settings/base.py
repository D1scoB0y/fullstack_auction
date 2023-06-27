from pydantic import BaseSettings, Field, SecretStr


class AppSettings(BaseSettings):

    class Cofig:
        allow_mutation = False
