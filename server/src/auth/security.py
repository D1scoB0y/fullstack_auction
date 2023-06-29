import random

import jwt
import bcrypt
from fastapi import HTTPException

from src.config import config


async def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


async def check_password(password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(password.encode(), hashed_password.encode())


async def generate_jwt(payload) -> str:
    return jwt.encode(payload, config.SECRET_KEY, algorithm="HS256")


async def parse_jwt(token: str) -> dict:

    try:
        payload = jwt.decode(token, config.SECRET_KEY, algorithms=["HS256"])
    except:
        raise HTTPException(status_code=400, detail='Invalid token')

    return payload


async def generate_4_digit_code() -> int:
    '''Generating a random 4-digit number'''
    return random.randrange(1_000, 10_000)
