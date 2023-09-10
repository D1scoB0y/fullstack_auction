import { FC } from 'react'

import styles from './LotsGrid.module.css'

import { ILotPreview } from '@/types/auction.interface'
import LotCard from '../LotCard/LotCard'


interface ILotsGridProps {
    lots: ILotPreview[]|null
}

const LotsGrid: FC<ILotsGridProps> = ({
    lots,
}) => {
  return (
    <div className={styles.lotsGrid}>
        
        {lots?.map((lot, i) => <LotCard key={i} lot={lot} />)}

    </div>
  )
}


export default LotsGrid
