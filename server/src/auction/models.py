import sqlalchemy as sa
from sqlalchemy.orm import mapped_column

import src.database as _db

import src.auction.utils as _auction_utils


class Lot(_db.Base):
    __tablename__ = 'lots'

    id = mapped_column(sa.Integer, primary_key=True)

    title = mapped_column(sa.String(70), nullable=False)

    description = mapped_column(sa.String(500))

    base_price = mapped_column(sa.Integer, nullable=False)

    reserve_price = mapped_column(sa.Integer, nullable=False)

    creation_date = mapped_column(sa.DateTime, nullable=False, default=_auction_utils.current_datetime())

    seller_id = mapped_column(sa.Integer, sa.ForeignKey('users.id'))

    end_date = mapped_column(sa.DateTime, nullable=False)

    images = mapped_column(sa.String, nullable=True)
