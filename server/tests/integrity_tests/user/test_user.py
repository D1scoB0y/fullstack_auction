import pytest
import src.user.schemas as _user_schemas
from httpx import AsyncClient


@pytest.mark.usefixtures('create_tables')
class TestRegistration:
    @pytest.mark.parametrize('test_data', [
        {
            'username': 'DiscoBoy1337',
            'email': 'valid1@example.com',
            'password': 'valid_password',
            'recaptchaToken': '',
        },
        {
            'username': 'Iris',
            'email': 'valid2@example.com',
            'password': 'valid_password',
            'recaptchaToken': '',
        }
    ])
    async def test_valid_registration(self, client: AsyncClient, test_data: dict):
        create_user_response = await client.post(
            '/auth/users',
            json=test_data,
        )

        assert create_user_response.status_code == 201
        assert isinstance(create_user_response.json(), str)

    @pytest.mark.parametrize('test_data, expected_code', [(
        {
            'username': 'DiscoB@y',
            'email': 'valid3@example.com',
            'password': 'valid_password',
            'recaptchaToken': '',
        }, 422),
        ({
            'username': 'DiscoBoy1337',
            'email': 'valid4@example.com',
            'password': 'valid_password',
            'recaptchaToken': '',
        }, 409)
    ])
    async def test_invalid_registration(
        self,
        client: AsyncClient,
        test_data: dict,
        expected_code: int
    ):
        create_user_response = await client.post(
            '/auth/users',
            json=test_data,
        )

        assert create_user_response.status_code == expected_code


@pytest.mark.usefixtures('create_tables', 'create_user')
class TestLogin:
    @pytest.mark.parametrize('credentials, expected_code', [
        ({
            'email': 'non_existing@example.com',
            'password': 'valid_password',
            'recaptchaToken': '',
        }, 401),
        ({
            'email': 'valid@example.com',
            'password': '',
            'recaptchaToken': '',
        }, 401),
    ])
    async def test_invalid_login(
        self,
        client: AsyncClient,
        credentials: dict,
        expected_code: int
    ):
        login_response = await client.post(
            '/auth/token',
            json=credentials,
        )

        assert login_response.status_code == expected_code

    async def test_valid_login(self, client: AsyncClient, test_user):
        test_user = test_user()

        login_response = await client.post(
            '/auth/token',
            json={
                'email': test_user['email'],
                'password': test_user['password'],
                'recaptchaToken': '',
            },
        )

        assert login_response.status_code == 200
        assert isinstance(login_response.json(), str)


@pytest.mark.usefixtures('create_tables', 'create_user')
class TestUpdateUser:
    @pytest.mark.parametrize('test_data', [
        {
            'username': 'newValidUsername',
            'email': 'newValidEmail@example.com',
            'phoneNumber': '+79999999999',
        },
    ])
    async def test_valid_update_user(self, test_data: dict, client: AsyncClient, token: str):
        update_user_response = await client.put(
            '/auth/users',
            json=test_data,
            headers={
                'Authorization': f'Bearer {token}',
            },
        )

        assert update_user_response.status_code == 204

    @pytest.mark.parametrize('test_data, expected_code', [
        ({
            'username': '',
            'email': 'invalidEmail.com',
            'phoneNumber': '7999999999',
        }, 422),
        ({
            'username': 'Disco@Boy1337',
            'email': 'valid5@example.com',
            'phoneNumber': '+79999999999',
        }, 422)
    ])
    async def test_invalid_update_user(
        self,
        test_data: dict,
        client: AsyncClient,
        token: str,
        expected_code: int,
    ):
        update_user_response = await client.put(
            '/auth/users',
            json=test_data,
            headers={'Authorization': f'Bearer {token}'},
        )

        assert update_user_response.status_code == expected_code


@pytest.mark.usefixtures('create_tables', 'create_user')
class TestGetUser:
    async def test_get_user(self, client: AsyncClient, token: str):
        get_user_response = await client.get(
            '/auth/users',
            headers={'Authorization': f'Bearer {token}'},
        )

        assert get_user_response.status_code == 200
        assert _user_schemas.ReadUserSchema(**get_user_response.json())


@pytest.mark.usefixtures('create_tables', 'create_user')
class TestRequestEmailMessage:
    @pytest.mark.skipif("not config.getoption('--runslow')", reason='Need --runslow option')
    async def test_request_email_verification(self, client: AsyncClient, token: str):
        request_email_verification_response = await client.get(
            "/auth/email-verification",
            headers={'Authorization': f'Bearer {token}'},
        )

        assert request_email_verification_response.status_code == 204

    @pytest.mark.skipif("not config.getoption('--runslow')", reason='Need --runslow option')
    async def test_second_request_email_verification(self, client: AsyncClient, token: str):
        '''Второй идентичный первому тест необходим для
        тестирования ограничения на кол-во запросов на
        отправку письма (можно раз в 1 минуту или вернется 429)'''

        request_email_verification_response = await client.get(
            "/auth/email-verification",
            headers={'Authorization': f'Bearer {token}'},
        )

        assert request_email_verification_response.status_code == 429


@pytest.mark.usefixtures('create_tables', 'create_user', 'add_phone')
class TestRequestPhoneCall:
    @pytest.mark.skipif("not config.getoption('--runslow')", reason='Need --runslow option')
    async def test_request_phone_verification(self, client: AsyncClient, token: str):
        verification_call_response = await client.get(
            '/auth/verification-call',
            headers={'Authorization': f'Bearer {token}'},
        )

        assert verification_call_response.status_code == 204

    @pytest.mark.skipif("not config.getoption('--runslow')", reason='Need --runslow option')
    async def test_second_request_phone_verification(self, client: AsyncClient, token: str):
        '''Второй идентичный первому тест необходим для
        тестирования ограничения на кол-во запросов на
        звонок (можно раз в 2 минуты или вернется 429)'''

        verification_call_response = await client.get(
            '/auth/verification-call',
            headers={'Authorization': f'Bearer {token}'},
        )

        assert verification_call_response.status_code == 429
