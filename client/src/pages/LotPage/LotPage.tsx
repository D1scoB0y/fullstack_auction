import { Lot } from "../../modules/Lot"
import PageMetaInfo from "../../components/PageMetaInfo/PageMetaInfo"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { LotCarousel } from "../../modules/LotCarousel"
import { MobileLotCarousel } from "../../modules/Lot"
import { useLotStore } from "../../modules/Lot"
import PageSpinner from "../../UI/PageSpinner/PageSpinner"


const LotPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const { id } = useParams()

    if (!id) {
        return <>404 not found</>
    }

    const {
        lot,
        fetchLot,
    } = useLotStore()

    useEffect(() => {
        setIsLoading(true)
        fetchLot(id)
    }, [])

    useEffect(() => {
        if (!lot) {
            setIsLoading(true)
            const t = setTimeout(
                () => setIsLoading(false),
                2000,
            )
            return () => clearTimeout(t)
        }
    }, [lot])

    if (!lot && isLoading) {
        return <PageSpinner />
    }

    if (!lot) {
        return <>404 not found</>
    }

    return (
        <>
            <PageMetaInfo
                title={lot?.title}
                description={lot?.description.slice(0, 180)}
            />

            <MobileLotCarousel
                images={lot.images}
            />

            <div className="content">
                <Lot />
            </div>

            <LotCarousel
                images={lot.images}
            />
        </>
    )
}

export default LotPage
