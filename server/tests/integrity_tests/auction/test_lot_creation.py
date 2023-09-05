import random as r
import datetime as dt

import pytest
from httpx import AsyncClient

import src.auction.utils as _auction_utils


def valid_end_date() -> str:

    auction_duration = dt.timedelta(days=r.randrange(1, 22))

    end_date = _auction_utils.current_datetime() + auction_duration

    return end_date.strftime('%Y-%m-%dT%H:%M')


def invalid_end_date() -> str:

    end_date = _auction_utils.current_datetime() - dt.timedelta(days=r.randrange(1, 100))

    return end_date.strftime('%Y-%m-%dT%H:%M')


@pytest.mark.usefixtures('create_tables', 'create_seller')
class TestLotCreation:

    @pytest.mark.parametrize('lot_data', [
        {
            'title': 's'*5,
            'basePrice': '12999',
            'reservePrice': '50000',
            'endDate': valid_end_date(),
            'description': '',
        },
        {
            'title': 's'*70,
            'basePrice': '0',
            'reservePrice': '0',
            'endDate': valid_end_date(),
            'description': 's'*500,
        },
    ])
    async def test_valid_create_lot(
            self,
            lot_data: dict,
            token: str,
            client: AsyncClient,
            test_images: str
        ):    

        files = [('images', open(img, 'rb')) for img in test_images]

        create_lot_response = await client.post(
            
            '/auction/lot',

            files=files,

            data=lot_data,

            headers={
                'Authorization': f'Bearer {token}'
            }
        )

        assert create_lot_response.status_code == 204


    @pytest.mark.parametrize('lot_data', [
        {
            'title': 's'*71,
            'basePrice': '12999',
            'reservePrice': '50000',
            'endDate': valid_end_date(),
            'description': '',
        },
        {
            'title': 's'*5,
            'basePrice': '12999',
            'reservePrice': '12999',
            'endDate': valid_end_date(),
            'description': '',
        },
        {
            'title': 's'*5,
            'basePrice': '12999',
            'reservePrice': '50000',
            'endDate': invalid_end_date(),
            'description': '',
        },
        {
            'title': 's'*5,
            'basePrice': '12999',
            'reservePrice': '50000',
            'endDate': valid_end_date(),
            'description': 's'*501,
        },
    ])
    async def test_invalid_create_lot(
            self,
            lot_data: dict,
            token: str,
            client: AsyncClient,
            test_images: list[str],
        ):    

        files = [('images', open(img_src, 'rb')) for img_src in test_images]

        try:

            create_lot_response = await client.post(
                
                '/auction/lot',

                files=files,

                data=lot_data,

                headers={
                    'Authorization': f'Bearer {token}'
                }
            )

            assert create_lot_response.status_code == 422

        except ValueError:

            pass
