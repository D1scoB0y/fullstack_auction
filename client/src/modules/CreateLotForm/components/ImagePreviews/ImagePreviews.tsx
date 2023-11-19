import { Dispatch, FC, SetStateAction } from 'react'
import ImagePreview from '../ImagePreview/ImagePreview'
import styles from './ImagePreviews.module.css'


interface Props {
    previews: string[]
    setPreviews: Dispatch<SetStateAction<string[]>> 
    files: File[]
    setFiles: Dispatch<SetStateAction<File[]>> 
}

const ImagePreviews: FC<Props> = ({
    previews,
    setPreviews,
    files,
    setFiles,
}) => {
    return (
        <div className={styles.previewsContainer}>
            {previews.map((src, index) => (
                <ImagePreview
                    key={index}
                    src={src}
                    index={index}
                    files={files}
                    previews={previews}
                    setFiles={setFiles}
                    setPreviews={setPreviews}
                />
            ))}
        </div>
    )
}

export default ImagePreviews
