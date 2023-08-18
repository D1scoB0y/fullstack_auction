import json

import pytest
import src.auth.schemas as _auth_schemas
from httpx import AsyncClient


class TestAuth:

    async def test_registration(self, client: AsyncClient, test_user: dict):
        
        create_user_response = await client.post(
            '/auth/registration',
            json=test_user,
        )

        assert create_user_response.status_code == 200
        assert isinstance(create_user_response.json(), str)


    async def test_login(self, client: AsyncClient, test_user: dict):

        login_user_response = await client.post(

            '/auth/login',

            json=json.dumps(
                f'grant_type=&username={test_user["email"]}&password={test_user["password"]}&scope=&client_id=&client_secret='
            ),

            headers={
                "Content-Type": "application/x-www-form-urlencoded"
            },
        )

        assert login_user_response.status_code == 200
        assert isinstance(login_user_response.json(), str)


class TestUserPermissions:

    async def test_update_user_data(
            self,
            client: AsyncClient,
            token: str,
            test_user: dict,
        ):

        test_user['phone_number'] = '+79133441134'

        update_user_response = await client.put(

            '/auth/update-user',

            json=test_user,

            headers={
                'Authorization': f'Bearer {token}',
            },
        )

        assert update_user_response.status_code == 204


    async def test_get_user(
            self,
            client: AsyncClient,
            token: str
        ):

        get_user_response = await client.get(

            '/auth/get-user',

            headers={
                'Authorization': f'Bearer {token}',
            },
        )

        assert get_user_response.status_code == 200
        assert _auth_schemas.ReadUserSchema(**get_user_response.json())
    

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
