import src.auth.security as _auth_security


async def test_password_hashing():

    password = 'IM_VERY_STRONG_PASSWORD'

    hashed_password = await _auth_security.hash_password(password)

    assert isinstance(hashed_password, str)
    assert await _auth_security.check_password(password, hashed_password)


async def test_jwt():
    payload = {'test': 'payload'}

    token = await _auth_security.generate_jwt(payload)

    parsed_payload = await _auth_security.parse_jwt(token)

    assert isinstance(token, str)
    assert parsed_payload == payload


async def test_generate_4_digit_code():
    code = await _auth_security.generate_4_digit_code()
    assert 999 < code < 10_000
