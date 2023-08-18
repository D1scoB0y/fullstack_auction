from httpx import AsyncClient


class TestIsUserDataUnique:

    async def test_check_username(
            self,
            client: AsyncClient,
            test_user: dict,
        ):

        check_username_response = await client.get(

            '/auth/check/username',
            
            params={
                'username': test_user['username'],
            },
        )

        assert check_username_response != 204   # Username should be already taken


    async def test_check_email(
            self,
            client: AsyncClient,
            test_user: dict,
        ):

        check_email_response = await client.get(

            '/auth/check/email',
            
            params={
                'email': test_user['email'],
            },
        )

        assert check_email_response != 204   # Email should be already taken


    async def test_check_phone(
            self,
            client: AsyncClient,
        ):

        check_email_response = await client.get(

            '/auth/check/phone',
            
            params={
                'phone_number': '+79133441134',
            },
        )

        assert check_email_response != 204   # Phone number should be already taken
