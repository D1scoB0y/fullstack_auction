import datetime as dt


def current_datetime() -> dt.datetime:
    return dt.datetime.utcnow()


def time_unit_postfix(time: int, postfix1, postfix2, postfix3):

    if time in range(5, 21) or time % 10 in range(5, 10) or time % 10 == 0:
        return postfix2
    elif time % 10 == 1:
        return postfix1
    else:
        return postfix3


def short_formatted_timedelta(timedelta: dt.timedelta):

    total_seconds = timedelta.total_seconds()

    days = total_seconds // (3600*24)
    total_seconds %= (3600*24)

    hours = total_seconds // 3600
    total_seconds %= 3600

    minutes = total_seconds // 60
    total_seconds %= 60

    res = ''

    if days:
        res += str(int(days)) + 'д'
    
    if hours:
        res += ' ' + str(int(hours)) + 'ч'
    
    if minutes:
        res += ' ' + str(int(minutes)) + 'с'

    return res


def full_formatted_timedelta(timedelta: dt.timedelta):
    pass
