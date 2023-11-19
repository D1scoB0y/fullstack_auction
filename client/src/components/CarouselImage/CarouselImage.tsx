import { FC, memo } from 'react'
import styles from './CarouselImage.module.css'


interface Props {
    src: string
    onClick?: () => void 
}

const CarouselImage: FC<Props> = ({
    src,
    onClick,
}) => {
    return (
        <div
            className={styles.imageContainer}
            onClick={onClick}
        >
            <img
                src={src}
                className={styles.image}
                alt="lot image"
            />
        </div>
    )
}

export default memo(CarouselImage)
