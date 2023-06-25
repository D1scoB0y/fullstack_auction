import sqlalchemy as sa

from src.database import Base


class User(Base):

    __tablename__ = 'users'

    id = sa.Column(sa.Integer, primary_key=True)

    username = sa.Column(sa.Integer, unique=True)

    email = sa.Column(sa.String, unique=True, nullable=False)
    email_is_verified = sa.Column(sa.Boolean, nullable=False, default=False)

    phone_number = sa.Column(sa.String, unique=True, nullable=False)
    phone_number_is_verified = sa.Column(sa.Boolean, nullable=False, default=False)

    password = sa.Column(sa.String, nullable=False)

    is_seller = sa.Column(sa.Boolean, nullable=False, default=False)
