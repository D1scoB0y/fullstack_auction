const  validatePhoneNumber = (phoneNumber: string): string => {
    if (phoneNumber.length > 0 && phoneNumber.indexOf('+') !== 0) {
        return 'Номер должен ничинаться с "+"'
    }

    if (phoneNumber.length > 0 && phoneNumber.length < 12) {
        return 'Введите корректный номер'
    }

    const allowedSymbols = '+1234567890'

    for (const symbol of phoneNumber) {
        if (allowedSymbols.indexOf(symbol) === -1) {
            return 'Допускаются только цифры и "+"'
        }
    }
    return ''
}

export default validatePhoneNumber
