import { useEffect, useState } from "react"
import { LotPreview } from "../../types/auction"
import AuctionService from "../../api/AuctionService"
import LotsGrid from "../../UI/LotsGrid/LotsGrid"
import PageMetaInfo from "../../components/PageMetaInfo/PageMetaInfo"
import styles from './Home.module.css'
import Pagination from "../../components/Pagination/Pagination"


const LOTS_PER_PAGE = 15

const Home = () => {
    const [lots, setLots] = useState<LotPreview[] | null>(null)
    const [page, setPage] = useState<number>(1)
    const [lotsQty, setLotQty] = useState<number>(0)

    useEffect(() => {
        (async () => {
            const res = await AuctionService.getLots(page)

            if (res) {
                setLotQty(res.lotsQty)
                setLots(res.lots)
            }
        })()
    }, [page])

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
                {lots?.length ? (
                    <>
                        <LotsGrid lots={lots} />
                        <Pagination
                            currentPage={page}
                            onPageChange={setPage}
                            totalPages={Math.ceil(lotsQty / LOTS_PER_PAGE)}
                        />
                    </>
                ) : (
                    <div className={styles.noLots}>
                        Лотов пока нет
                    </div>
                )}
            </div>
        </>
    )
}

export default Home
