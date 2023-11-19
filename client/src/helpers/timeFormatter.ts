const formatTime = (
    totalSeconds: number,
    withSeconds: boolean,
) => {
    const days = Math.floor(totalSeconds / (3600 * 24))
    totalSeconds %= 3600 * 24

    const hours = Math.floor(totalSeconds / 3600)
    totalSeconds %= 3600

    const minutes = Math.floor(totalSeconds / 60)
    totalSeconds %= 60

    let res = ''

    if (days) {
        res += days + 'д'
    }

    if (hours) {
        res += ' ' + hours + 'ч'
    }

    if (minutes) {
        res += ' ' + minutes + 'м'
    }

    if (withSeconds) {
        if (totalSeconds) {
            res += ' ' + Math.floor(totalSeconds) + 'с'
        }
        return res
    }

    if (!days && !hours && !minutes && totalSeconds) {
        res += ' ' + Math.floor(totalSeconds) + 'с'
    }

    return res
}

const formatTimeFromEvent = (secondsFromEvent: number) => {
    const days = Math.floor(secondsFromEvent / (3600 * 24))

    if (days) {
        return days + ' д'
    }

    secondsFromEvent %= 3600 * 24

    const hours = Math.floor(secondsFromEvent / 3600)

    if (hours) {
        return hours + ' ч'
    }

    secondsFromEvent %= 3600

    const minutes = Math.floor(secondsFromEvent / 60)

    if (minutes) {
        return minutes + ' м'
    }

    secondsFromEvent %= 60

    return secondsFromEvent + ' с'
}

const timezoneOffset = () => {
    const date = new Date()
    const offset = date.getTimezoneOffset() * 60 * 1000
    return offset
}

export {
    formatTime,
    formatTimeFromEvent,
    timezoneOffset,
}
