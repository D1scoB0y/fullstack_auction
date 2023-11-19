import { FC, useEffect } from "react"
import styles from './LotCarousel.module.css'
import Portal from "../../../UI/Portal/Portal"
import CloseCarouselButton from "../components/CloseCarouselButton/CloseCarouselButton"
import CarouselImage from "../../../components/CarouselImage/CarouselImage"
import CarouselArrowLayer from "../components/CarouselArrowLayer/CarouselArrowLayer"
import { useCarouselStore } from "../store/useCarouselStore"
import CarouselCounter from "../components/CarouselCounter/CarouselCounter"


interface Props {
    images: string[]
}

const LotCarousel: FC<Props> = ({
    images,
}) => {
    const {
        isActive,
        page,
    } = useCarouselStore()

    useEffect(() => {
        if (isActive) {
            document.body.classList.add('modalOpen')
            return
        }

        document.body.classList.remove('modalOpen')
    }, [isActive])

    if (isActive) {
        return (
            <Portal>
                <div className={styles.overlay}>
                    <div className={styles.carouselContent}>
                        <div
                            className={styles.window}
                        >
                            <div
                                className={styles.slider}
                                style={{
                                    transform: `translateX(${-100*page}%)`
                                }}
                            >
                                {images.map(img => (
                                    <CarouselImage
                                        src={img}
                                        key={img}
                                    />
                                ))}
                            </div>
                        </div>

                        <CarouselCounter
                            imagesQty={images.length}
                        />

                        <CloseCarouselButton />

                        <CarouselArrowLayer
                            imagesQty={images.length}
                        /> 
                    </div>
                </div>
            </Portal>
        )
    }
}

export { LotCarousel }
 