import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { ILot } from '@/types/auction.interface'

import styles from './LotPage.module.css'
import { getLot } from '@/services/auctionService/lotService'
import Loader from '@/components/UI/Loader/Loader'


const LotPage = () => {

    const { lotId } = useParams()

    if (!lotId) {
        return <>404 not found</>
    }

    const [lot, setLot] = useState<ILot|null>(null)

    useEffect(() => {

        (async() => {

            const fetchedLot = await getLot(lotId)
            
            if (fetchedLot) {
                setLot(fetchedLot)
            }
        })()
    }, [])

    if (!lot) {
        return (
            <Loader
                width={100}
                height={100} 
            />
        )
    }

    return (
        <div>
            {lot && (
                <>
                    {JSON.parse(lot.images).map((src: string) => (
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
