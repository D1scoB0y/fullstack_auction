const validateEmail = (email: string): string => {
    if (!email) {
        return 'Введите электронную почту'
    }

    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!re.test(email)){
        return 'Введите корректную почту' 
    }

    return ''
}

export default validateEmail
