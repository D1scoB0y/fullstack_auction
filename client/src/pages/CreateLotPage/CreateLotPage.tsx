

import styles from './CreateLotPage.module.css'

import PageTitle from '@/components/UI/PageTitle/PageTitle'
import NewLotForm from './NewLotForm/NewLotForm'
import FileDropzone from '@/components/UI/FileDropzone/FileDropzone'

const CreateLotPage = () => {


    return (
        <>
            <PageTitle text='Новый лот' />
            
            <div className={styles.newLotFormContainer}>

                <FileDropzone />

                <NewLotForm />

            </div>
        </>
    )
}


export default CreateLotPage
