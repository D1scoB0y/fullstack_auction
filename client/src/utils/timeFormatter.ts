const formatTime = (totalSeconds: number) => {

    const days = Math.floor(totalSeconds / (3600*24))
    totalSeconds %= (3600*24)

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

    if (!days && !hours && !minutes && totalSeconds) {
        res += ' ' + Math.floor(totalSeconds) + 'с'
    }

    return res
}


export {
    formatTime,
}
