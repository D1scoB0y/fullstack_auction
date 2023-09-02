import json

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

import src.auth.models as _auth_models
import src.auction.schemas as _auction_schemas
import src.auction.models as _auction_models

import src.auction.images.resizer as _images_resizer
import src.auction.images.cloud_service as _cloud_service


async def create_lot(
        lot_data: _auction_schemas.CreateLotSchema,
        user: _auth_models.User,
        session: AsyncSession,
    ):

    new_lot = _auction_models.Lot(
        title=lot_data.title,
        description=lot_data.description,
        end_date=lot_data.end_date,
        seller_id=user.id,
        reserve_price=lot_data.reserve_price,
        base_price=lot_data.base_price,
    )

    session.add(new_lot)
    await session.commit()
    await session.refresh(new_lot)

    resized_images = await _images_resizer.handle_images(lot_data.images)

    img_links = await _cloud_service.upload_images(new_lot.id, resized_images)

    new_lot.images = json.dumps(img_links)

    await session.commit()


async def get_lot_by_id(
        lot_id: int,
        session: AsyncSession,
    ) -> _auction_schemas.ReadLotSchema:

    lot = await session.get(_auction_models.Lot, lot_id)

    if lot is None:
        raise HTTPException(status_code=404, detail='Lot does not exist')

    return json.loads(
        _auction_schemas.ReadLotSchema
            .from_orm(lot)
            .json(by_alias=True)
    )
