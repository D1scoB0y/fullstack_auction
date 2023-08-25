import src.auth.security as _auth_security


async def test_password_hashing():

    password = 'IM_VERY_STRONG_PASSWORD'

    hashed_password = await _auth_security.hash_password(password)

    assert isinstance(hashed_password, str)
    assert await _auth_security.check_password(password, hashed_password)


async def test_jwt():
    payload = {'test': 'payload'}

    token = await _auth_security.generate_jwt(payload)

    assert isinstance(token, str)

    parsed_token = await _auth_security.parse_jwt(token)

    assert parsed_token == payload
