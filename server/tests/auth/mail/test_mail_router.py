from httpx import AsyncClient


async def test_email_verification(ac: AsyncClient, test_user):

    # Getting verif token
    send_token_response = await ac.post("/auth/mail/verification-message-request", params={
        "email": test_user.email,
    })

    assert send_token_response.status_code == 200

    token = send_token_response.json()

    assert token

    # Checking verification token
    validation_token_response = await ac.get('/auth/mail/validate-verification-token', params={
        'token': token
    })

    assert validation_token_response.status_code == 200
