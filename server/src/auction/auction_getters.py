from typing import Optional

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, text, desc

import src.auction.schemas as _auction_schemas
import src.auction.models as _auction_models


async def get_lot_by_id(
    lot_id: int,
    session: AsyncSession,
) -> Optional[_auction_models.Lot]:
    return await session.get(_auction_models.Lot, lot_id)


async def get_lots(
    page: int,
    session: AsyncSession,
):
    limit = 15
    start = (page - 1) * limit
    end = page * limit

    lots = await session.execute(
        select(
            _auction_models.Lot,
        ).order_by(
            _auction_models.Lot.end_date,
        ),
    )
    lots = lots.scalars().all()

    target_lots = lots[start:end]
    lots = list(
        map(
            _auction_schemas.PreviewLotSchema.from_lot,
            target_lots,
        ),
    )

    return lots


async def get_lot_bids(
    lot_id: int,
    session: AsyncSession,
):
    bids = await session.execute(
        select(
            _auction_models.Bid,
        ).where(
            _auction_models.Bid.lot_id == lot_id,
        ).order_by(
            desc(_auction_models.Bid.placing_date),
        ),
    )

    return bids.scalars().all()


async def get_user_bids(
    user_id: int,
    session: AsyncSession,
):
    stmt = text('''
        select b1.lot_id,
            b1.value as max_user_bid_value,
            l.title as lot_title,
            l.current_bid,
            l.images,
            l.end_date as lot_end_date
        from bids b1
        join (
            select lot_id,
                max(value) as value
            from bids
            where bidder_id = :user_id
            group by lot_id
        ) as b2 on b2.lot_id = b1.lot_id and b2.value = b1.value
        join lots l on l.lot_id = b1.lot_id
    ''')

    bids = await session.execute(stmt, params={'user_id': user_id})

    res = list(map(lambda x: x._asdict(), bids))

    return res
