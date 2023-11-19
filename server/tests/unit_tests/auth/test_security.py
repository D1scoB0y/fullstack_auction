import src.user.security as _user_security


async def test_password_hashing():
    password = 'IM_VERY_STRONG_PASSWORD'

    hashed_password = _user_security.hash_password(password)

    assert isinstance(hashed_password, str)
    assert _user_security.check_password(password, hashed_password)


async def test_jwt():
    payload = {'test': 'payload'}

    token = _user_security.generate_jwt(payload)

    assert isinstance(token, str)

    parsed_token = _user_security.parse_jwt(token)

    assert parsed_token == payload
