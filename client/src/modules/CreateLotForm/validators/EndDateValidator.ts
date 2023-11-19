const validateEndDate = (endDate: string): string => {
    if (!endDate) {
        return 'Введите дату окончания'
    }

    const maxDuration = 1000 * 3600 * 24 * 21 // 21 days

    // Если установленная дата окончания наступит более чем через 21 день
    if (Date.parse(endDate) - Date.now() > maxDuration) {
        return 'Максимальная длительность аукциона - 21 день'
    }

    // Если дата окончания <= текущей дате
    if (Date.parse(endDate) <= Date.now()) {
        return 'Установите корректную дату окончания'
    }

    return ''
}

export default validateEndDate
