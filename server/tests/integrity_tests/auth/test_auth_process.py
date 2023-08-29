import json

import pytest
import src.auth.schemas as _auth_schemas
from httpx import AsyncClient


@pytest.mark.usefixtures('create_tables')
class TestRegistration:

    async def test_valid_registration(self, client: AsyncClient, test_user):

        test_user = test_user()

        test_user.pop('phoneNumber')

        create_user_response = await client.post(
            '/auth/registration',
            json=test_user,
        )

        assert create_user_response.status_code == 200
        assert isinstance(create_user_response.json(), str)


    @pytest.mark.parametrize('test_data', [
        {
            'username': 'Disco@Boy',
            'email': 'anotherothervalid@example.com',
            'password': '',
        },
    ])
    async def test_invalid_registration(self, client: AsyncClient, test_data: dict):

        create_user_response = await client.post(
            '/auth/registration',
            json=test_data,
        )

        assert create_user_response.status_code in (422, 409)


@pytest.mark.usefixtures('create_tables', 'create_user')
class TestLogin:

    @pytest.mark.parametrize('credentials', [
        {
            'email': 'non_existing@example.com',
            'password': 'valid_password'
        },
        {
            'email': 'valid@example.com',
            'password': ''
        },
    ])
    async def test_invalid_login(self, client: AsyncClient, credentials: dict):

        login_response = await client.post(

            '/auth/login',

            json=json.dumps(
                f'grant_type=&username={credentials["email"]}&password={credentials["password"]}&scope=&client_id=&client_secret='
            ),

            headers={
                "Content-Type": "application/x-www-form-urlencoded"
            },
        )

        assert login_response.status_code in (422, 401)


    async def test_valid_login(self, client: AsyncClient, test_user):

        test_user = test_user()

        login_response = await client.post(

            '/auth/login',

            json=json.dumps(
                f'grant_type=&username={test_user["email"]}&password={test_user["password"]}&scope=&client_id=&client_secret='
            ),

            headers={
                "Content-Type": "application/x-www-form-urlencoded"
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
    async def test_valid_update_user(
            self,
            test_data: dict,
            client: AsyncClient,
            token: str,
        ):

        update_user_response = await client.put(

            '/auth/update-user',

            json=test_data,

            headers={
                'Authorization': f'Bearer {token}',
            },
        )

        assert update_user_response.status_code == 204
    

    @pytest.mark.parametrize('test_data', [
        {
            'username': '',
            'email': 'invalidEmail.com',
            'phoneNumber': '7999999999',
        },
    ])
    async def test_invalid_update_user(
            self,
            test_data: dict,
            client: AsyncClient,
            token: str,
        ):


        update_user_response = await client.put(

            '/auth/update-user',

            json=test_data,

            headers={
                'Authorization': f'Bearer {token}',
            },
        )

        assert update_user_response.status_code == 422


@pytest.mark.usefixtures('create_tables', 'create_user')
class TestGetUser:

    async def test_get_user(
            self,
            client: AsyncClient,
            token: str,
        ):

        get_user_response = await client.get(

            '/auth/get-user',

            headers={
                'Authorization': f'Bearer {token}',
            },
        )

        assert get_user_response.status_code == 200
        assert _auth_schemas.ReadUserSchema(**get_user_response.json())


@pytest.mark.usefixtures('create_tables', 'create_user')
class TestRequestEmailMessage:

    @pytest.mark.skipif("not config.getoption('--runslow')", reason='Need --runslow option')
    async def test_request_email_verification(
            self,
            client: AsyncClient,
            token: str,
        ):
        
        request_email_verification_response = await client.get(

            "/auth/mail/verification-message-request",

            headers={
                'Authorization': f'Bearer {token}',
            },
        )

        assert request_email_verification_response.status_code == 204

    @pytest.mark.skipif("not config.getoption('--runslow')", reason='Need --runslow option')
    async def test_second_request_email_verification(
            self,
            client: AsyncClient,
            token: str,
        ):
        '''Второй идентичный первому тест необходим для
        тестирования ограничения на кол-во запросов на
        отправку письма (можно раз в 1 минуту или вернется 429)'''
        
        request_email_verification_response = await client.get(

            "/auth/mail/verification-message-request",

            headers={
                'Authorization': f'Bearer {token}',
            },
        )

        assert request_email_verification_response.status_code == 429


@pytest.mark.usefixtures('create_tables', 'create_user', 'add_phone')
class TestRequestPhoneCall:

    @pytest.mark.skipif("not config.getoption('--runslow')", reason='Need --runslow option')
    async def test_request_phone_verification(
            self,
            client: AsyncClient,
            token: str,
        ):

        verification_call_response = await client.get(

            "/auth/mobile/verification-call-request",

            headers={
                'Authorization': f'Bearer {token}',
            },
        )

        assert verification_call_response.status_code == 204

    
    @pytest.mark.skipif("not config.getoption('--runslow')", reason='Need --runslow option')
    async def test_second_request_phone_verification(
            self,
            client: AsyncClient,
            token: str,
        ):
        '''Второй идентичный первому тест необходим для
        тестирования ограничения на кол-во запросов на
        звонок (можно раз в 2 минуты или вернется 429)'''

        verification_call_response = await client.get(

            "/auth/mobile/verification-call-request",

            headers={
                'Authorization': f'Bearer {token}',
            },
        )

        assert verification_call_response.status_code == 429
