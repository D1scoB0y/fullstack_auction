import datetime as dt

from starlette.datastructures import UploadFile as StarletteFile


def validate_images(images: list[StarletteFile]) -> list[StarletteFile]:
    
    if not len(images):
        raise ValueError('Minimum 1 image')

    if len(images) > 12:
        raise ValueError('Maximum 12 image')

    for img in images:

        if not isinstance(img, StarletteFile):
            raise ValueError('Must be a UploadFile')

        if img.size:

            if img.size > (1024**2)*4:  # 4 MB
                raise ValueError('Max image size is 4 MB')
            
    return images


def validate_end_date(end_date: dt.datetime) -> dt.datetime:

    if end_date < dt.datetime.utcnow():
        raise ValueError('The auction end date must be later than the auction creation date.')
    
    if end_date - dt.datetime.utcnow() > dt.timedelta(days=21):
        raise ValueError('Max auction duration - 21 days')
    
    return end_date


def validate_reserve_price(base_price: int, reserve_price: int) -> int:

    if reserve_price < 0:
        raise ValueError('Reserve price must be >= 0')
    
    if reserve_price and base_price:
        if reserve_price <= base_price:
            raise ValueError('Reserve price must be greater than base price')

    return reserve_price
