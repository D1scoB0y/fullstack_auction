import { FC } from 'react'
import styles from './MobileLotCarousel.module.css'
import CarouselImage from '../../../../components/CarouselImage/CarouselImage'
import { useCarouselStore } from '../../../LotCarousel'



interface Props {
    images: string[]
}

const MobileLotCarousel: FC<Props> = ({
    images,
}) => {
    const openCarousel = useCarouselStore(state => state.openCarousel)

    return (
        <div className={styles.window}>
            <div className={styles.slider}>
                {images.map((img, index) => (
                    <CarouselImage
                        key={img}
                        src={img}
                        onClick={() => openCarousel(index)}
                    />
                ))}
            </div>
        </div>
    )
}

export { MobileLotCarousel }
