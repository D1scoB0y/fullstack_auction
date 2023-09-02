from typing import Annotated

import datetime as dt

from pydantic import BaseModel, Field
from fastapi import UploadFile, File, Form


class CreateLotSchema(BaseModel):

    title: str
    description: str
    base_price: int
    reserve_price: int
    end_date: dt.datetime
    images: list[UploadFile]

    @classmethod
    def as_form(
        cls,
        title: Annotated[str, Form(min_length=5, max_length=70)],
        description: Annotated[str, Form(max_length=500)],
        base_price: Annotated[int, Form(alias='basePrice')],
        reserve_price: Annotated[int, Form(alias='reservePrice')] ,
        end_date: Annotated[dt.datetime, Form(alias='endDate')],
        images: Annotated[list[UploadFile], File()],
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

