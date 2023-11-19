import { FC } from "react"
import styles from './Gallery.module.css'
import clsx from "clsx"
import GalleryImage from "./GalleryImage"
import { useCarouselStore } from "../../../LotCarousel"


const Gallery: FC<{ images: string[] }> = ({
    images,
}) => {
    const openCarousel = useCarouselStore(state => state.openCarousel)

    return (
        <div className={styles.gallery}>
            {images.map((img, index) => (
                <div
                    key={img}
                    className={clsx(
                        styles.galleryImageContainer,
                        index === 0 && styles.mainImage,
                    )}
                    onClick={() => openCarousel(index)}
                >
                    <GalleryImage
                        img={img}
                    />
                </div>
            ))}
        </div>
    )
}

export default Gallery
