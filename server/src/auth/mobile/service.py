'''
    This module describes the logic of requesting a call to a user
    who wants to confirm the phone number.

    We generate a 4-digit code and send it along with a call request to PHONE API,
    and also save this code in the `phone_number_verif_code` field.
    
    After a while, the user will receive a call.

    The last 4 digits of the number are its verification code.

    With the help of a frontend application, this code will
    fall into the code verification endpoint.
'''
from fastapi import HTTPException
from httpx import AsyncClient

from src.config import config


async def verification_call(phone_number: str, verif_code: int) -> int|None:

        call_data = {
            'phone': phone_number,
            'phone_suffix': str(verif_code),
            'public_key': config.PHONE_SERVICE_API_KEY,
            'campaign_id': config.PHONE_SERVICE_COMPAIGN_ID,
        }

        print(f'\n{call_data}\n')

        async with AsyncClient() as http:

            response = await http.post('https://zvonok.com/manager/cabapi_external/api/v1/phones/flashcall/', data=call_data)

            if response.json()['status'] != 'ok':
                raise HTTPException(status_code=400, detail='Request to verification call rejected. HINT: check request data for issues')

        return verif_code
