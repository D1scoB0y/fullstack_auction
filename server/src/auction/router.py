from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.ext.asyncio import AsyncSession

import src.database as _db
import src.auth.models as _auth_models
import src.auth.user_getters as _auth_user_getters

import src.auction.schemas as _auction_schemas
import src.auction.service as _auction_service


router = APIRouter(prefix='/auction')


@router.post('/lot', status_code=204, tags=['Lots'])
async def create_lot_path(
        lot_data: _auction_schemas.CreateLotSchema = Depends(
            _auction_schemas.CreateLotSchema.as_form
        ),
        user: _auth_models.User = Depends(_auth_user_getters.get_current_user),
        session: AsyncSession = Depends(_db.get_session),
    ):

    if not user.is_seller:
        raise HTTPException(status_code=403, detail='User does not have seller permissions')

    await _auction_service.create_lot(lot_data, user, session)


@router.get('/lot/{lot_id}', response_model=_auction_schemas.ReadLotSchema, tags=['Lots'])
async def get_lot_path(
        lot_id: int,
        session: AsyncSession = Depends(_db.get_session),
    ):

    return await _auction_service.get_lot_by_id(lot_id, session)


@router.get('/lots', response_model=list[_auction_schemas.PreviewLotSchema], tags=['Lots'])
async def get_lots_path(
        page: int,
        session: AsyncSession = Depends(_db.get_session), 
    ):

    return await _auction_service.get_lots(page, session)
