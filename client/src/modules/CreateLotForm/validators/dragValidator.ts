const validateDrag = (
    dataTransfer: DataTransfer,
    loadedFilesQty: number,
): string => {
    if (loadedFilesQty + dataTransfer.items.length > 12) {
        return 'Максимум 12 изображений'
    }

    const allowedExtensions = ['jpeg', 'png']

    for (const item of dataTransfer.items) {
        const fileExtension = item.type.split('/')[1]

        if (!allowedExtensions.includes(fileExtension)) {
            return 'Только "jpg" и "png"'
        }
    }

    return ''
}

export default validateDrag
