const validateCode = (code: string): string => {
    if (!code) {
        return 'Введите код'
    }

    if (code.length < 4 || code.length > 4) {
        return 'Длина кода - 4 символа'
    }

    return ''
}

export default validateCode
