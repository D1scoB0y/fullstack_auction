import { useState } from 'react'
import ToggleMenu from '../../../components/ToggleMenu/ToggleMenu'
import { Link } from 'react-router-dom'
import Button from '../../../UI/Button/Button'
import styles from './UserLots.module.css'
import { LotPreview } from '../../../types/auction'
import ActiveLots from '../components/ActiveLots/ActiveLots'
import ArchivedLots from '../components/ArchivedLots/ArchivedLots'


const UserLots = () => {
    const [activeLots, setActiveLots] = useState<LotPreview[]>([])
    const [archivedLots, setAtchivedLots] = useState<LotPreview[]>([])
    const [menuToggled, setMenuToggled] = useState<boolean>(false)

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
                <ArchivedLots
                    lots={archivedLots}
                    setLots={setAtchivedLots}
                />
            ) : (
                <ActiveLots
                    lots={activeLots}
                    setLots={setActiveLots}
                />
            )}
        </>
    )
}

export { UserLots }
