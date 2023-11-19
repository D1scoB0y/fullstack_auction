const validateTitle = (title: string): string => {
    if (!title) {
        return 'Введите название лота'
    }

    if (title.length < 5) {
        return 'Минимальная длина названия - 5 символов'
    }

    return ''
}

export default validateTitle
