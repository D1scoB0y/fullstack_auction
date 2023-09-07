import { useState, useEffect } from "react"

import { Helmet } from "react-helmet-async"

import LotCard from "@/components/UI/LotCard/LotCard"
import { ILotPreview } from "@/types/auction.interface"
import { getLots } from "@/services/auctionService/lotService"


const LandingPage = () => {

    const [lots, setLots] = useState<ILotPreview[]|null>(null)

    useEffect(() => {

        (async () => {

            const lots = await getLots(1)
            
            if (lots) {
                setLots(lots)
            }
            console.log(lots)
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

            <div>

                {lots?.map(lot => <LotCard lot={lot} />)}

            </div>
        </>

    )
}


export default LandingPage
