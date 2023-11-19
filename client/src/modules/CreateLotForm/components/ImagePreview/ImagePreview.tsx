import { Dispatch, FC, SetStateAction } from 'react'
import styles from './ImagePreview.module.css'


interface Props {
    src: string
    index: number
    previews: string[]
    setPreviews: Dispatch<SetStateAction<string[]>>
    files: File[]
    setFiles: Dispatch<SetStateAction<File[]>>
}

const ImagePreview: FC<Props> = ({
    src,
    index,
    previews,
    files,
    setPreviews,
    setFiles,
}) => {
    const deleteFile = () => {
        setPreviews([...previews.slice(0, index), ...previews.slice(index + 1)])
        setFiles([...files.slice(0, index), ...files.slice(index + 1)])
    }

    return (
        <div className={styles.imageContainer}>
            <img
                className={styles.imagePreview}
                src={src}
                alt="image preview"
            />

            <img
                onClick={deleteFile}
                className={styles.bucketIcon}
                src="/trash_bucket.png"
                alt="trash bucket icon"
            />

            {index == 0 && <span className={styles.mainImage}>Главное фото</span>}
        </div>
    )
}

export default ImagePreview
