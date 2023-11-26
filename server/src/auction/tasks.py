import asyncio

from sqlalchemy import text

import src.database as _db
import src.celery_ as _celery


async def update_lot_status():
    async with _db.async_session_maker() as session:
        stmt = text('''
            update lots
            set status = 'waiting_for_payment'
            where status = 'active' and end_date <= now() at time zone 'utc'
        ''')

        await session.execute(stmt)
        await session.commit()


@_celery.celery.task
def update_lot_status_task():
    asyncio.get_event_loop().run_until_complete(update_lot_status())
