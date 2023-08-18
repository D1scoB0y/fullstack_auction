import sqlalchemy as sa
from sqlalchemy.orm import mapped_column


from src.database import Base


class User(Base):
    __tablename__ = 'users'

    id = mapped_column(sa.Integer, primary_key=True)

    username = mapped_column(sa.String, unique=True, index=True, nullable=False)

    email = mapped_column(sa.String, unique=True, index=True, nullable=False)
    email_is_verified = mapped_column(sa.Boolean, nullable=False, default=False)

    phone_number = mapped_column(sa.String, unique=True, index=True)
    phone_number_verif_code = mapped_column(sa.Integer)
    phone_number_is_verified = mapped_column(sa.Boolean, nullable=False, default=False)

    password = mapped_column(sa.String, nullable=False)

    is_seller = mapped_column(sa.Boolean, nullable=False, default=False)
