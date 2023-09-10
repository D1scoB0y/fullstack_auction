import datetime as dt

import pytest

import src.auction.utils as _auction_utils


class TestFormatTimeToEnd:

    @pytest.mark.parametrize('timedelta', [
        dt.timedelta(days=1, hours=1, seconds=1),
        dt.timedelta(days=100, hours=25, minutes=12),
        dt.timedelta(seconds=1),
    ])
    def test_format_time_to_end(self, timedelta: dt.timedelta):

        formatted = _auction_utils.short_formatted_timedelta(timedelta)

        assert isinstance(formatted, str)
