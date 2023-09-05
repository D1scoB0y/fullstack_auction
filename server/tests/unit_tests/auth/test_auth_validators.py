import pytest

import src.auth.validators as _auth_validators


class TestUsernameValidator:

    @pytest.mark.parametrize('username', [
        '',
        '(*()>^:<$@:^>$@)',
        'tooooooooooooooooolong',
        [],
    ])
    def test_invalid_username(self, username: str):

        try:
            _auth_validators.validate_username(username)
            is_valid = True
        except ValueError:
            is_valid = False

        assert not is_valid, 'Username field is valid'


    @pytest.mark.parametrize('username', [
        'DiscoBoy',
        'bob',
        'disco_boy',
    ])
    def test_valid_username(self, username: str):

        assert _auth_validators.validate_username(username), 'Username field is invalid'


class TestEmailValidator:

    @pytest.mark.parametrize('email', [
        '',
        'test@example',
        [],
    ])
    def test_invalid_email(self, email: str):

        try:
            _auth_validators.validate_email(email)
            is_valid = True
        except ValueError:
            is_valid = False

        assert not is_valid, 'Email field is valid'


    @pytest.mark.parametrize('email', [
        'test@example.com',
        'a@a.co',
    ])
    def test_valid_email(self, email: str):

        assert _auth_validators.validate_email(email), 'Email field is invalid'


class TestPhoneValidator:

    @pytest.mark.parametrize('phone', [
        '+',
        '79999999999',
        '+7999999999',
        [],
    ])
    def test_invalid_phone(self, phone: str):

        try:
            _auth_validators.validate_phone(phone)
            is_valid = True
        except ValueError:
            is_valid = False

        assert not is_valid, 'Phone field is valid'


    @pytest.mark.parametrize('phone', [
        '+79999999999',
        '+71234567890',
    ])
    def test_valid_phone(self, phone: str):

        assert _auth_validators.validate_phone(phone), 'Phone field is invalid'


class TestPasswordValidator:

    @pytest.mark.parametrize('password', [
        '1234',
        'qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwert',
        [],
    ])
    def test_invalid_password(self, password: str):

        try:
            _auth_validators.validate_password(password)
            is_valid = True
        except ValueError:
            is_valid = False

        assert not is_valid, 'Password field is valid'


    @pytest.mark.parametrize('password', [
        '12345678',
        'qwerty12',
        'qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwer'
    ])
    def test_valid_password(self, password: str):

        assert _auth_validators.validate_password(password), 'Password field is invalid'
