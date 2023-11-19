import { FC } from 'react'
import styles from './CarouselCounter.module.css'
import { useCarouselStore } from '../..'


const CarouselCounter: FC<{ imagesQty: number }> = ({
    imagesQty,
}) => {
    const page = useCarouselStore(state => state.page)

    return (
        <div
            className={styles.counter}
        >
            {page+1} / {imagesQty}
        </div>
    )
}

export default CarouselCounter
