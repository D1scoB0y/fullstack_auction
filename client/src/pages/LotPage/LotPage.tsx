import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { ILot } from '@/types/auction.interface'

import styles from './LotPage.module.css'
import { getLot } from '@/services/auctionService/lotService'


const LotPage = () => {

    const [lot, setLot] = useState<ILot|null>(null)

    const { lotId } = useParams()

    useEffect(() => {

        (async() => {

            if (lotId) {
                const fetchedLot = await getLot(lotId)
                
                if (fetchedLot) {
                    setLot(fetchedLot)
                }
            }
        })()

        console.log(lot?.images)

    }, [])


    return (
        <div>
            {lot && (
                <>
                    {JSON.parse(lot.images).map(src => (
                        <img
                            className={styles.img}
                            src={src}
                            alt="auction image"
                        />
                    ))}
                </>
            )}
        </div>
    )
}


export default LotPage
