import CarouselArrow from '../CarouselArrow/CarouselArrow'
import styles from './CarouselArrowLayer.module.css'
import { FC } from 'react'
import { useCarouselStore } from '../../store/useCarouselStore'


const CarouselArrowLayer: FC<{ imagesQty: number }> = ({
    imagesQty,
}) => {
    const {
        page,
        moveLeft,
        moveRight,
    } = useCarouselStore()

    return (
        <div className={styles.arrowsContainer}>
            <CarouselArrow
                onClick={() => {
                    if (!page) return
                    moveLeft()
                }}
                hide={!page}
            />
            <CarouselArrow
                onClick={() => {
                    if (page === imagesQty - 1) return
                    moveRight()
                }}
                hide={page === imagesQty - 1}
                right
            />
        </div>
    )
}

export default CarouselArrowLayer
