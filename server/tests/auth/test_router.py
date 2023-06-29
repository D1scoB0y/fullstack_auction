from httpx import AsyncClient

import src.auth.schemas as _auth_schemas


async def test_create_user(ac: AsyncClient, test_user):

    response = await ac.post("/auth/registration", json={
        "email": test_user.email,
        "phone_number": test_user.phone_number,
        "password": test_user.password,
        "username": test_user.username,
    })

    assert response.status_code == 200
    assert _auth_schemas.ReadUserSchema(**response.json())


async def test_auth_user(ac: AsyncClient, test_user):

    response = await ac.post("/auth/login", json={
        "email": test_user.email,
        "password": test_user.password,
    })

    assert response.status_code == 200
    assert _auth_schemas.ReadUserSchema(**response.json())
