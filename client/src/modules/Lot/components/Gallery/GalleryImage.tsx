import { FC, memo } from "react"
import styles from './Gallery.module.css'


const GalleryImage: FC<{ img: string }> = ({
    img,
}) => {
    return (
        <img
            className={styles.galleryImage}
            src={img}
            alt="lot image"
        />
    )
}

export default memo(GalleryImage)
