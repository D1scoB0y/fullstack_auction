import { useState } from 'react'

import clsx from 'clsx'


import styles from './FileDropzone.module.css'


const FileDropzone = () => {

    const [drag, setDrag] = useState<boolean|null>(false)

    const [isValidDrag, setIsValidDrag] = useState<boolean>(true)

    const [files, setFiles] = useState<object[]>([])

    const [previews, setPeviews] = useState<string[]>([])


    const isFileValid = (fileType: string): boolean => {

        const fileExtension = fileType.split('/')[1]

        console.log(fileExtension)

        return ['jpg', 'webp', 'png', 'bmp'].includes(fileExtension)
    }

    const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {

        e.preventDefault();

        setDrag(true)

        const fileType = e.dataTransfer.items[0].type

        setIsValidDrag(isFileValid(fileType))
    }

    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {

        e.preventDefault()

        setIsValidDrag(true)

        setDrag(false)
    }

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        
        e.preventDefault()

        const fileType = e.dataTransfer.items[0].type

        const isValid = isFileValid(fileType)

        if (isValid) {

            const newFile = e.dataTransfer.files[0]

            setPeviews(
                prev => ([
                    ...prev,
                    URL.createObjectURL(newFile)
                ])
            )
            
            setFiles(
                prev => ([
                    ...prev,
                    newFile,
                ])
            )
        }
    }

    return (
        <div
            className={clsx(
                styles.dropzone,
                drag && styles.dropzoneDragged,
                !isValidDrag && styles.dropzoneError
            )}

            onDragStart={e => onDragStart(e)}
            onDragLeave={e => onDragLeave(e)}
            onDragOver={e => onDragStart(e)}
            onDrop={e => onDrop(e)}
        >

            {drag ? (
                <>
                    {isValidDrag ? (
                        <span className={styles.dropzoneHint}>+ Файл</span>
                    ) : (
                        <span className={styles.dropzoneHint}>Недопустимый файл</span>
                    )}
                </>
            ) : (
                <div className={styles.dropzoneHintContainer}>
                    <span className={styles.dropzoneHint}>Перетащите файлы для загрузки</span>
                    <span className={styles.dropzoneSmallHint}>Форматы: jpg, png, bmp, webp</span>
                </div>
            )}

        </div>
    )
}


export default FileDropzone
