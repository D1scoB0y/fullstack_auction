const validateUsername = (username: string): string => {
    if (!username) {
        return 'Придумайте имя пользователя'
    }

    if (username.length < 3 || username.length > 16) {
        return 'Длина имени - от 3 до 16 символов'
    }

    const allowedSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_'

    for (const s of username) {
        if (!allowedSymbols.includes(s)) {
            return 'Только латинские буквы и цифры'
        }
    }

    return ''
}

export default validateUsername
