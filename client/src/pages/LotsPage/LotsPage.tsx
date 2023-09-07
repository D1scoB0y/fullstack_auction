import { useNavigate } from 'react-router-dom'

import styles from './LotsPage.module.css'

import PageTitle from '@/components/UI/PageTitle/PageTitle'
import Button from '@/components/UI/Button/Button'


const LotsPage = () => {

    const navigate = useNavigate()

    return (
        <>
            <PageTitle text='Лоты' />

            <Button
                text='+ Создать лот'
                onClick={() => navigate('/new-lot')}

                style={{marginTop: 36, marginLeft: 'auto'}}
            />


            <div className={styles.lotsCardContainer}>



            </div>
        </>
    )
}


export default LotsPage
