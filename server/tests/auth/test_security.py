import src.auth.security as _auth_security


async def test_hash_password():
    assert isinstance(await _auth_security.hash_password('IM_STRONG'), str)


async def test_check_password():

    password = 'IM_VERY_STRONG_PASSWORD'

    hashed_password = await _auth_security.hash_password(password)

    assert await _auth_security.check_password(password, hashed_password)
