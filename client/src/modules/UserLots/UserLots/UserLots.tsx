import { useEffect, useState } from 'react'
import ToggleMenu from '../../../components/ToggleMenu/ToggleMenu'
import { Link } from 'react-router-dom'
import Button from '../../../UI/Button/Button'
import styles from './UserLots.module.css'
import LotsGrid from '../../../UI/LotsGrid/LotsGrid'
import { LotPreview } from '../../../types/auction'
import AuctionService from '../../../api/AuctionService'


const UserLots = () => {
    const [lots, setLots] = useState<LotPreview[]>([])
    const [menuToggled, setMenuToggled] = useState<boolean>(false)

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
            <Link
                to="/create-lot"
                style={{ marginTop: 32 }}
            >
                <Button
                    text='+ Новый лот'
                    className={styles.newLotButton}
                />
            </Link>

            <ToggleMenu
                options={["Активные", "Архив"]}
                toggled={menuToggled}
                setToggled={setMenuToggled}
            />

            {menuToggled ? (
                <LotsGrid lots={lots?.filter(lot => lot.timeToEnd <= 0)} />
            ) : (
                <LotsGrid lots={lots?.filter(lot => lot.timeToEnd > 0)} />
            )}
        </>
    )
}

export { UserLots }
