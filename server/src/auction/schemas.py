from typing import Annotated
import datetime as dt

from pydantic import BaseModel, Field, validator, root_validator
from fastapi import UploadFile, Form

import src.auction.validators as _auction_validators


class CreateLotSchema(BaseModel):

    title: str
    description: str
    base_price: int
    reserve_price: int
    end_date: dt.datetime
    images: list[UploadFile]


    @validator('images')
    def validate_images(cls, images: list[UploadFile]):

        return _auction_validators.validate_images(images) # type: ignore


    @validator('end_date')
    def validate_end_date(cls, end_date: dt.datetime):

        return _auction_validators.validate_end_date(end_date)


    @root_validator
    def validate_reserve_price(cls, values):

        _auction_validators.validate_reserve_price(values['base_price'], values['reserve_price'])

        return values


    @validator('base_price')
    def validate_base_price(cls, base_price: int) -> int:

        if base_price < 0:
            raise ValueError('Base price must be greater than 0')
        
        return base_price


    @classmethod
    def as_form(
        cls,
        title: Annotated[str, Form(min_length=5, max_length=70)],
        base_price: Annotated[int, Form(alias='basePrice')],
        reserve_price: Annotated[int, Form(alias='reservePrice')],
        end_date: Annotated[dt.datetime, Form(alias='endDate')],
        images:  list[UploadFile],
        description: Annotated[str, Form(max_length=500)] = '',
    ):
        return cls(
            title=title,
            description=description,
            base_price=base_price,
            reserve_price=reserve_price,
            end_date=end_date,
            images=images,
        )


class ReadLotSchema(BaseModel):

    title: str
    description: str
    base_price: int = Field(alias='basePrice')
    reserve_price: int = Field(alias='reservePrice')
    end_date: dt.datetime = Field(alias='endData')
    images: str

    class Config:
        orm_mode=True
        allow_population_by_field_name = True
