from httpx import AsyncClient
import json

import src.auth.schemas as _auth_schemas


async def test_auth_scenario(ac: AsyncClient, test_user):
    '''
        Testing of registration, login, updating and getting user data
    '''

    # User registration test
    create_user_response = await ac.post('/auth/registration', json=test_user)

    assert create_user_response.status_code == 200
    assert isinstance(create_user_response.json(), str)

    
    # User login test
    email = test_user['email']
    password = test_user['password']

    login_user_response = await ac.post('/auth/login',
        json=json.dumps(f'grant_type=&username={email}&password={password}&scope=&client_id=&client_secret='),
        headers={
        "Content-Type": "application/x-www-form-urlencoded"
        },
    )

    token = create_user_response.json()

    assert login_user_response.status_code == 200
    assert isinstance(token, str)


    # Updating user data test
    new_phone_number = '+79133441134'

    test_user['phone_number'] = new_phone_number

    update_user_response = await ac.put('/auth/update-user', json=test_user, headers={'Authorization': f'Bearer {token}'})

    assert update_user_response.status_code == 204


    # Getting user data test
    get_user_response = await ac.get('/auth/get-user', headers={'Authorization': f'Bearer {token}'})

    assert get_user_response.status_code == 200
    assert _auth_schemas.ReadUserSchema(**get_user_response.json())
    assert get_user_response.json()['phone_number'] == new_phone_number


async def test_user_data_is_unique(ac: AsyncClient, test_user):
    
    # test user`s email must be taken
    check_email_response = await ac.get('/auth/check-email', params={'email': test_user['email']})
    assert check_email_response.status_code == 409

    # test user`s username must be taken
    check_email_response = await ac.get('/auth/check-username', params={'username': test_user['username']})
    assert check_email_response.status_code == 409
