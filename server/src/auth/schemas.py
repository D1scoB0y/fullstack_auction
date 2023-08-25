from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, Field, validator

import src.auth.validators as _auth_validators


oauth2schema = OAuth2PasswordBearer(tokenUrl='/auth/login')


class Username(BaseModel):

    username: str

    @validator('username')
    def special_symbols_checking(cls, value: str) -> str:

        return _auth_validators.validate_username(value)


class Email(BaseModel):

    email: str

    @validator('email')
    def email_validation(cls, value: str) -> str:

        return _auth_validators.validate_email(value)


class PhoneNumber(BaseModel):

    phone_number: str|None = Field(alias='phoneNumber')

    @validator('phone_number')
    def phone_validation(cls, value: str|None) -> str|None:

        return _auth_validators.validate_phone(value)


class Password(BaseModel):

    password: str

    @validator('password')
    def password_validation(cls, value: str) -> str:

        return _auth_validators.validate_password(value)




class RegistrationUserSchema(Username, Email, Password):
    pass


class UpdateUserSchema(Username, Email, PhoneNumber):
    pass


class ChangePasswordSchema(BaseModel):
    new_password: str = Field(min_length=8, max_length=64, alias='newPassword')
    current_password: str = Field(alias='currentPassword')


class LoginWithGoogleSchema(BaseModel):
    token: str


class ReadUserSchema(Username, Email, PhoneNumber):

    id: int
    email_is_verified: bool = Field(alias='emailIsVerified')
    phone_number_is_verified: bool = Field(alias='phoneNumberIsVerified')
    is_seller: bool = Field(alias='isSeller')
    created_via_google: bool = Field(alias='createdViaGoogle')

    class Config:
        orm_mode=True
        allow_population_by_field_name = True
