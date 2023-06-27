from httpx import AsyncClient


async def test_create_user(ac: AsyncClient):

    response = await ac.post("/auth/registration", json={
        "email": "jyjyartem@gmail.com",
        "phone_number": "89107088050",
        "password": "sdaknd553342",
        "username": "DiscoBoy",
    })

    assert response.status_code == 200


async def test_auth_user(ac: AsyncClient):

    response = await ac.post("/auth/login", json={
        "email": "jyjyartem@gmail.com",
        "password": "sdaknd553342",
    })

    assert response.status_code == 200
    assert response.json()


async def test_email_verification(ac: AsyncClient):

    # Getting verif token
    send_token_response = await ac.post("/auth/get-email-verif-link", params={
        "email": "jyjyartem@gmail.com",
    })

    assert send_token_response.status_code == 200

    token = send_token_response.json()

    assert token

    # Checking verif token
    check_token_response = await ac.get(f'/auth/check-email-verif-link', params={
        'token': token
    })

    assert check_token_response.status_code == 200
