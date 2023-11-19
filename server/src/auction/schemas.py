import json
import datetime as dt
from typing import Annotated

from pydantic import BaseModel, ConfigDict, Field, field_validator
from fastapi import UploadFile, Form

import src.auction.validators as _auction_validators
import src.auction.models as _auction_models


class CreateLotSchema(BaseModel):
    title: str
    description: str
    base_price: int
    end_date: dt.datetime
    images: list[UploadFile]

    @field_validator('images')
    def validate_images(cls, images: list[UploadFile]):
        return _auction_validators.validate_images(images)  # type: ignore

    @field_validator('end_date')
    def validate_end_date(cls, end_date: dt.datetime):
        return _auction_validators.validate_end_date(end_date)

    @field_validator('base_price')
    def validate_base_price(cls, base_price: int) -> int:
        if base_price < 0:
            raise ValueError('Base price must be greater than 0')

        return base_price

    @staticmethod
    def as_form(
        title: Annotated[str, Form(min_length=5, max_length=70)],
        base_price: Annotated[int, Form(alias='basePrice')],
        end_date: Annotated[dt.datetime, Form(alias='endDate')],
        images: list[UploadFile],
        description: Annotated[str, Form(max_length=500)] = '',
    ):
        return CreateLotSchema(
            title=title,
            description=description,
            base_price=base_price,
            end_date=end_date,
            images=images,
        )


class PreviewLotSchema(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    lot_id: int = Field(alias='id')
    image: str
    title: str
    current_bid: str = Field(alias='currentBid')
    time_to_end: float = Field(alias='timeToEnd')

    @staticmethod
    def from_lot(lot: _auction_models.Lot):
        first_image = json.loads(lot.images)[0]  # type: ignore
        timedelta = lot.end_date - dt.datetime.utcnow()
        seconds_to_end = timedelta.total_seconds()
        formatted_current_bid = f'{lot.current_bid:,}'

        return PreviewLotSchema(
            id=lot.lot_id,
            image=first_image,
            title=lot.title,
            current_bid=formatted_current_bid,  # type: ignore
            time_to_end=seconds_to_end,  # type: ignore
        )


class ReadLotSchema(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    lot_id: int = Field(alias='lotId')
    title: str
    description: str
    base_price: int = Field(alias='basePrice')
    current_bid: int = Field(alias='currentBid')
    seller_id: int = Field(alias='sellerId')
    end_date: str = Field(alias='endDate')
    time_to_end: float = Field(alias='timeToEnd')
    images: list[str]

    @staticmethod
    def from_lot(lot: _auction_models.Lot):
        images = json.loads(lot.images)[1:]  # type: ignore
        timedelta = lot.end_date - dt.datetime.utcnow()
        time_to_end = timedelta.total_seconds()

        return ReadLotSchema(
            lot_id=lot.lot_id,  # type: ignore
            title=lot.title,
            description=lot.description,
            images=images,
            base_price=lot.base_price,  # type: ignore
            current_bid=lot.current_bid,  # type: ignore
            seller_id=lot.seller_id,  # type: ignore
            end_date=str(lot.end_date),  # type: ignore
            time_to_end=time_to_end,  # type: ignore
        )


class PlaceBidSchema(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    lot_id: int = Field(alias='lotId')
    value: int


class ReadBidSchema(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    bidder_username: str = Field(alias='bidderUsername')
    value: int
    seconds_from_placing: int = Field(alias='secondsFromPlacing')

    @staticmethod
    def from_bid(bid: _auction_models.Bid):
        timedelta = bid.placing_date - dt.datetime.utcnow()
        seconds_from_placing = abs(int(timedelta.total_seconds()))

        return ReadBidSchema(
            bidder_username=bid.bidder.username,  # type: ignore
            value=bid.value,
            seconds_from_placing=seconds_from_placing,  # type: ignore
        )


class ReadUserBidsSchema(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    lot_id: int = Field(alias='lotId')
    max_user_bid_value: int = Field(alias='maxUserBidValue')
    lot_title: str = Field(alias='lotTitle')
    current_bid: int = Field(alias='currentBid')
    image: str
    lot_end_date: str = Field(alias='lotEndDate')
    time_to_end: int = Field(alias='timeToEnd')

    @staticmethod
    def from_bid(bid: dict):
        timedelta = bid['lot_end_date'] - dt.datetime.utcnow()

        bid['lot_end_date'] = str(bid['lot_end_date'])
        bid['time_to_end'] = int(timedelta.total_seconds())
        bid['image'] = json.loads(bid['images'])[0]

        return ReadUserBidsSchema(**bid)
