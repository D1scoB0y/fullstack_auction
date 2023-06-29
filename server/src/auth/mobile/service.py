from fastapi import HTTPException
from httpx import AsyncClient

from src.config import config
import src.auth.security as _auth_security


async def verification_call(phone_number: str):

        # Verification code (it will be last 4 digits of bot's phone number)
        verif_code = await _auth_security.generate_4_digit_code()

        async with AsyncClient() as http:
             
            response = await http.post('https://zvonok.com/manager/cabapi_external/api/v1/phones/flashcall/', data={
                'public_key': config.PHONE_SERVICE_PUBLIC_KEY,
                'phone': phone_number,
                'campaign_id': '543013859',
                'phone_suffix': str(verif_code),
            })

            if response.json()['status'] != 'ok':
                raise HTTPException(status_code=400, detail='Request to verification call rejected. HINT: check request data for issues')

        return verif_code
