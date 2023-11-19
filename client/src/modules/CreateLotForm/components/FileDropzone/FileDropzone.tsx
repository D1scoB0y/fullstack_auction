import { Dispatch, FC, SetStateAction, useState } from 'react'
import clsx from 'clsx'
import styles from './FileDropzone.module.css'
import { resizeImage } from '../../helpers/resizer'
import Spinner from '../../../../UI/Spinner/Spinner'
import validateDrag from '../../validators/dragValidator'


interface Props {
    loadedFilesQty: number
    setFiles: Dispatch<SetStateAction<File[]>>
    setPreviews: Dispatch<SetStateAction<string[]>>
}

const FileDropzone: FC<Props> = ({
    loadedFilesQty,
    setPreviews,
    setFiles,
}) => {
    const [drag, setDrag] = useState<boolean | null>(false)
    const [dragError, setDragError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDrag(true)

        const error = validateDrag(e.dataTransfer, loadedFilesQty)

        setDragError(error)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragError('')
        setDrag(false)
    }

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()

        if (dragError) {
            setDragError('')
            return
        }

        setDrag(false)
        setIsLoading(true)

        const maxSize = 1024 ** 2 * 4

        for (const file of e.dataTransfer.files) {
            if (file.size > maxSize) {
                setDrag(true)
                setDragError('Максимальный вес одного файла - 4 MB')

                setTimeout(() => {
                    setDrag(false)
                    setDragError('')
                }, 1200)
                setIsLoading(false)
                return
            }

            const imgURL = await resizeImage(file)

            setPreviews(prev => [...prev, imgURL])
            setFiles(prev => [...prev, file])
        }

        setIsLoading(false)
    }

    return (
        <div
            className={clsx(
                styles.dropzone,
                drag && styles.dropzoneDragged,
                dragError && styles.dropzoneError,
            )}
        >
            <div
                className={styles.dropzoneOverlay}
                onDragStart={e => handleDragStart(e)}
                onDragLeave={e => handleDragLeave(e)}
                onDragOver={e => handleDragStart(e)}
                onDrop={e => handleDrop(e)}
            />

            {drag ? (
                <>
                    {dragError ? (
                        <span className={styles.dropzoneHint}>{dragError}</span>
                    ) : (
                        <span className={styles.dropzoneHint}>+ Файл</span>
                    )}
                </>
            ) : (
                <>
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <div className={styles.dropzoneHintContainer}>
                            <span className={styles.dropzoneHint}>
                                Перетащите файлы для загрузки
                            </span>
                            <span className={styles.dropzoneSmallHint}>
                                Форматы: jpg, png
                            </span>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default FileDropzone
