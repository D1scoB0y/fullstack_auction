from httpx import AsyncClient


async def test_phone_number_verification(ac: AsyncClient, test_user):

    # Getting verif call
    verification_call_response = await ac.post("/auth/mobile/verification-call-request", params={'phone_number': test_user['phone_number']})
    assert verification_call_response.status_code == 200
    
    code = verification_call_response.json()


    # Validate verification code
    validate_code_response = await ac.post('/auth/mobile/validate-verification-code', params={'phone_number': test_user['phone_number'], 'verif_code': code})
    assert validate_code_response.status_code == 200
