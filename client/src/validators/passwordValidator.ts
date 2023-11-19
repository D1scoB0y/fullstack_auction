const validatePassword = (password: string): string => {
    if (!password) {
        return 'Введите пароль'
    }

    if (password.length < 8) {
        return 'Минимальная длина пароля - 8'
    }

    return ''
}

export default validatePassword
