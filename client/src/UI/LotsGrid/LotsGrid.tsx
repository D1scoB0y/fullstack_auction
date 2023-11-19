import { FC } from 'react'
import styles from './LotsGrid.module.css'
import { LotPreview } from '../../types/auction'
import LotCard from '../LotCard/LotCard'


interface Props {
    lots: LotPreview[] | null
}

const LotsGrid: FC<Props> = ({
    lots,
}) => {
    return (
        <div className={styles.lotsGrid}>
            {lots?.map(lot => <LotCard key={lot.id} lot={lot} />)}
        </div>
    )
}

export default LotsGrid
