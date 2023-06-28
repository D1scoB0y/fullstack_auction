from httpx import AsyncClient

import src.auth.schemas as _auth_schemas


async def test_create_user(ac: AsyncClient):

    response = await ac.post("/auth/registration", json={
        "email": "jyjyartem@gmail.com",
        "phone_number": "89107088050",
        "password": "sdaknd553342",
        "username": "DiscoBoy",
    })

    assert response.status_code == 200
    assert _auth_schemas.ReadUserSchema(**response.json())


async def test_auth_user(ac: AsyncClient):

    response = await ac.post("/auth/login", json={
        "email": "jyjyartem@gmail.com",
        "password": "sdaknd553342",
    })

    assert response.status_code == 200
    assert _auth_schemas.ReadUserSchema(**response.json())
