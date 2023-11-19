from fastapi import APIRouter, Depends, HTTPException, status

from sqlalchemy.ext.asyncio import AsyncSession

import src.database as _db
import src.utils as _utils
import src.user.models as _user_models
import src.auction.schemas as _auction_schemas
import src.auction.service as _auction_service
import src.user.utils as _user_utils
import src.auction.exception as _auction_exception


router = APIRouter(prefix='/auction')


@router.post(
    '/lots',
    status_code=status.HTTP_201_CREATED,
    tags=['Lots'],
)
@_utils.catch_unexpected_errors
async def create_lot(
    lot_data: _auction_schemas.CreateLotSchema = Depends(
        _auction_schemas.CreateLotSchema.as_form,
    ),
    user: _user_models.User = Depends(_user_utils.get_current_user),
    session: AsyncSession = Depends(_db.get_session),
):
    try:
        await _auction_service.create_lot(lot_data, user, session)
    except _auction_exception.MissingPermissionsError as e:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=e.message,
        )


@router.get(
    '/lots/{lot_id}',
    response_model=_auction_schemas.ReadLotSchema,
    status_code=status.HTTP_200_OK,
    tags=['Lots'],
)
@_utils.catch_unexpected_errors
async def get_lot(lot_id: int, session: AsyncSession = Depends(_db.get_session)):
    try:
        lot = await _auction_service.fetch_lot(lot_id, session)
    except _auction_exception.LotNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=e.message,
        )

    return lot


@router.get(
    '/lots',
    response_model=list[_auction_schemas.PreviewLotSchema],
    status_code=status.HTTP_200_OK,
    tags=['Lots'],
)
@_utils.catch_unexpected_errors
async def get_lots(page: int, session: AsyncSession = Depends(_db.get_session)):
    return await _auction_service.fetch_lots(page, session)


@router.post(
    '/bids',
    status_code=status.HTTP_201_CREATED,
    tags=['Lots'],
)
@_utils.catch_unexpected_errors
async def place_bid(
    bid_data: _auction_schemas.PlaceBidSchema,
    user: _user_models.User = Depends(_user_utils.get_current_user),
    session: AsyncSession = Depends(_db.get_session),
):
    try:
        await _auction_service.place_bid(bid_data, user, session)
    except _auction_exception.MissingPermissionsError as e:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=e.message,
        )
    except _auction_exception.LotNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=e.message,
        )
    except _auction_exception.InactiveLotError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=e.message,
        )
    except _auction_exception.BidValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=e.message,
        )


@router.get(
    '/lot-bids',
    response_model=list[_auction_schemas.ReadBidSchema],
    status_code=status.HTTP_200_OK,
    tags=['Lots'],
)
@_utils.catch_unexpected_errors
async def get_lot_bids(
    lot_id: int,
    session: AsyncSession = Depends(_db.get_session),
):
    return await _auction_service.fetch_lot_bids(lot_id, session)


@router.get(
    '/user-bids',
    response_model=list[_auction_schemas.ReadUserBidsSchema],
    status_code=status.HTTP_200_OK,
    tags=['Lots'],
)
@_utils.catch_unexpected_errors
async def get_user_bids(
    user: _user_models.User = Depends(_user_utils.get_current_user),
    session: AsyncSession = Depends(_db.get_session),
):
    return await _auction_service.fetch_user_bids(user.user_id, session)
