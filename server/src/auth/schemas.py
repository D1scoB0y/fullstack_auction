from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, Field


oauth2schema = OAuth2PasswordBearer(tokenUrl='/auth/login')


class RegistrationUserSchema(BaseModel):
    username: str = Field(..., min_length=3, max_length=20)
    email: str = Field(..., min_length=2, max_length=320)
    password: str = Field(..., min_length=8, max_length=64)


class UpdateUserSchema(BaseModel):
    username: str = Field(..., min_length=3, max_length=20)
    email: str = Field(..., min_length=2, max_length=320)
    phone_number: str = Field(..., min_length=12, max_length=12)


class ReadUserSchema(BaseModel):
    id: int
    username: str
    email: str
    email_is_verified: bool
    phone_number: str|None
    phone_number_is_verified: bool
    is_seller: bool

    class Config:
        orm_mode=True
