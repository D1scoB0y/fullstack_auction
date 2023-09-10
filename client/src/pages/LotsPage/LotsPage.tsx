import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './LotsPage.module.css'

import { getLots } from '@/services/auctionService/lotService'

import Button from '@/components/UI/Button/Button'
import ToggleMenu from '@/components/UI/ToggleMenu/ToggleMenu'
import { ILotPreview } from '@/types/auction.interface'
import LotCard from '@/components/UI/LotCard/LotCard'
import LotsGrid from '@/components/UI/LotsGrid/LotsGrid'


const LotsPage = () => {

    const [lots, setLots] = useState<ILotPreview[]|null>(null)
    const [menuToggled, setMenuToggled] = useState<boolean>(false)

    const navigate = useNavigate()

    useEffect(() => {
        (async() => {
            const lots = await getLots(1)
            
            if (lots) {
                setLots(lots)
            }
        })()
    }, [])

    return (
        <>
            <Button
                text='+ Создать лот'
                onClick={() => navigate('/new-lot')}

                style={{marginTop: 36}}
            />

            <ToggleMenu options={['Активные', 'Архив']} toggled={menuToggled} setToggled={setMenuToggled} />

            <LotsGrid lots={lots} />
        </>
    )
}


export default LotsPage
