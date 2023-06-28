from httpx import AsyncClient


async def test_email_verification(ac: AsyncClient):

    # Getting verif token
    send_token_response = await ac.post("/auth/mail/send-email-verif-link", params={
        "email": "jyjyartem@gmail.com",
    })

    assert send_token_response.status_code == 200

    token = send_token_response.json()

    assert token

    # Checking verif token
    check_token_response = await ac.get(f'/auth/mail/check-email-verif-link', params={
        'token': token
    })

    assert check_token_response.status_code == 200