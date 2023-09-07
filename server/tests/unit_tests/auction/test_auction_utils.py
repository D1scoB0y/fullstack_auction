import datetime as dt

import pytest

import src.auction.utils as _auction_utils


class TestFormatTimeToEnd:

    @pytest.mark.parametrize('timedelta', [
        dt.timedelta(days=1, hours=1, seconds=1),
        dt.timedelta(days=100, hours=25, minutes=12)
    ])
    def test_format_time_to_end(self, timedelta: dt.timedelta):

        f = _auction_utils.short_formatted_timedelta(timedelta)

        print(f)

        assert True


