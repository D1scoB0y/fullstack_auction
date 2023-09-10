import { useState, useEffect } from "react"

import { Helmet } from "react-helmet-async"

import { ILotPreview } from "@/types/auction.interface"
import { getLots } from "@/services/auctionService/lotService"
import LotsGrid from "@/components/UI/LotsGrid/LotsGrid"


const LandingPage = () => {

    const [lots, setLots] = useState<ILotPreview[]|null>(null)

    useEffect(() => {

        (async () => {

            const lots = await getLots(1)
            
            if (lots) {
                setLots(lots)
            }
        })()
    }, [])

    return (
        <>
            <Helmet>
                <title>Аукционы раритетной фототехники и фотографии | FotoJäger`s Auctions</title>
                <meta
                    name="description"
                    content="Добро пожаловать на наш онлайн-аукцион, специализирующийся на продаже редкой фототехники и старинных фотографий.  
                    Делайте ставки на изысканные изделия, которые рассказывают истории с помощью образов и мастерства."
                />
            </Helmet>

            <LotsGrid lots={lots}/>
        </>
    )
}


export default LandingPage
