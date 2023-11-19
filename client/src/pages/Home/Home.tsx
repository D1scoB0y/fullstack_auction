import { useEffect, useState } from "react"
import { LotPreview } from "../../types/auction"
import AuctionService from "../../api/AuctionService"
import LotsGrid from "../../UI/LotsGrid/LotsGrid"
import PageMetaInfo from "../../components/PageMetaInfo/PageMetaInfo"


const Home = () => {
    const [lots, setLots] = useState<LotPreview[] | null>(null)

    useEffect(() => {
        (async () => {
            const lots = await AuctionService.getLots(1)

            if (lots) {
                setLots(lots)
            }
        })()
    }, [])

    return (
        <>
            <PageMetaInfo
                title="Аукционы раритетной фототехники и фотографии | FotoJäger`s Auctions"
                description="Добро пожаловать на наш онлайн-аукцион, специализирующийся на
                продаже редкой фототехники и старинных фотографий. Делайте ставки на
                изысканные изделия, которые рассказывают истории с помощью образов и
                мастерства."
            />

            <div className="content">
                {lots && lots.length ? (
                    <LotsGrid lots={lots.filter(lot => lot.timeToEnd >= 0)} />
                ) : (
                    <>Лотов пока нет</>
                )}
            </div>
        </>
    )
}

export default Home
