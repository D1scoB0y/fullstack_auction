import { Dispatch, FC, SetStateAction, useState } from 'react'
import clsx from 'clsx'

import styles from './FileDropzone.module.css'

import { resizeImage } from '@/utils/resizer'
import Loader from '../Loader/Loader'


interface IFileDropzoneProps {
    previews: string[]
    setFiles: Dispatch<SetStateAction<File[]>>
    setPreviews: Dispatch<SetStateAction<string[]>>
}

const FileDropzone: FC<IFileDropzoneProps> = ({
    previews,
    setFiles,
    setPreviews,
}) => {

    const [drag, setDrag] = useState<boolean|null>(false)
    const [dragError, setDragError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    
    const wrongFileSize = () => {
        setDrag(true)
        setDragError('Максимальный вес одного файла - 4 MB')

        setTimeout(() => {
            setDrag(false)
            setDragError('')
        }, 1200)
    }

    const isDragValid = (dataTransfer: DataTransfer): boolean => {

        if (dataTransfer.items.length > 12 || previews.length + dataTransfer.items.length > 12) {
            setDragError('Максимум 12 изображений')
            return false
        }

        for (const i of dataTransfer.items) {

            const fileExtension = i.type.split('/')[1]

            if (!['jpg', 'jpeg', 'webp', 'png', 'bmp'].includes(fileExtension)) {
                setDragError('Только jpg, png, bmp, webp')
                return false
            }
        }
        
        setDragError('')
        return true
    } 

    const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {

        e.preventDefault()

        setDrag(true)

        isDragValid(e.dataTransfer)
    }

    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {

        e.preventDefault()

        setDragError('')
        setDrag(false)
    }

    const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        
        e.preventDefault()

        setDragError('')
        setDrag(false)

        setIsLoading(true)

        if (!dragError) {

            for (const file of e.dataTransfer.files) {

                if (file.size > (1024**2)*4) {
                    wrongFileSize()
                    setIsLoading(false)
                    return
                }

                const imgURL = await resizeImage(file)
                
                setPreviews(
                    prev => ([
                        ...prev,
                        imgURL,
                    ])
                )

                setFiles(
                    prev => ([
                        ...prev,
                        file,
                    ])
                )
            }
        }

        setIsLoading(false)
    }


    return (
        <div
            className={clsx(
                styles.dropzone,
                drag && styles.dropzoneDragged,
                dragError && styles.dropzoneError
            )}
        >
            <div
                className={styles.dropzoneOverlay}

                onDragStart={e => onDragStart(e)}
                onDragLeave={e => onDragLeave(e)}
                onDragOver={e => onDragStart(e)}
                onDrop={e => onDrop(e)}
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
                        <Loader width={64} height={64} />
                    ) : (
                        <div className={styles.dropzoneHintContainer}>
                            <span className={styles.dropzoneHint}>Перетащите файлы для загрузки</span>
                            <span className={styles.dropzoneSmallHint}>Форматы: jpg, png, bmp, webp</span>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}


export default FileDropzone
