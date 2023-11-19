import datetime as dt
from io import BytesIO

import pytest
from starlette.datastructures import UploadFile

import src.auction.validators as _auctions_validators


class TestImagesValidator:

    @pytest.mark.parametrize('images', [
        [UploadFile(BytesIO())],
        [UploadFile(BytesIO(), size=(1024**2) * 4)],
        [UploadFile(BytesIO()) for _ in range(12)],
    ])
    async def test_valid_images(self, images: list[UploadFile]):
        assert _auctions_validators.validate_images(images)

    @pytest.mark.parametrize('images', [
        [UploadFile(BytesIO()) for _ in range(13)],
        [UploadFile(BytesIO(), size=(1024**2) * 5)],
    ])
    async def test_invalid_images(self, images):
        try:
            _auctions_validators.validate_images(images)
            is_valid = True

        except ValueError:
            is_valid = False

        assert not is_valid


class TestEndDateValidator:

    @pytest.mark.parametrize('end_date', [
        dt.datetime.utcnow() + dt.timedelta(hours=12),
        dt.datetime.utcnow() + dt.timedelta(days=21),
    ])
    async def test_valid_end_date(self, end_date: dt.datetime):
        assert _auctions_validators.validate_end_date(end_date)

    @pytest.mark.parametrize('end_date', [
        dt.datetime.utcnow(),
        dt.datetime.utcnow() + dt.timedelta(days=22),
        dt.datetime.utcnow() - dt.timedelta(days=1),
    ])
    async def test_invalid_end_date(self, end_date: dt.datetime):
        try:
            _auctions_validators.validate_end_date(end_date)

            raise ValueError('Wrong end date is valid')

        except ValueError:
            assert True
