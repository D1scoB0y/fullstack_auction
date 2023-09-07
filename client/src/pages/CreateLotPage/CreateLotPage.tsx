import { useState } from 'react'

import styles from './CreateLotPage.module.css'

import { Helmet } from 'react-helmet-async'

import PageTitle from '@/components/UI/PageTitle/PageTitle'
import NewLotForm from './NewLotForm/NewLotForm'
import FileDropzone from '@/components/UI/FileDropzone/FileDropzone'
import ImagePreview from '@/components/UI/ImagePreview/ImagePreview'


const CreateLotPage = () => {

    const [files, setFiles] = useState<File[]>([])
    const [previews, setPreviews] = useState<string[]>([])

    return (
        <>

            <Helmet>
                <title>Новый лот | FotoJäger`s Auctions</title>
            </Helmet>

            <PageTitle text='Новый лот' />
            
            <div className={styles.newLotFormContainer}>

                <div>
                    <FileDropzone
                        previews={previews}
                        setFiles={setFiles}
                        setPreviews={setPreviews}
                    />

                    <div className={styles.previewsContainer}>

                        {previews.map((src, index) => (

                            <ImagePreview
                                key={index}
                                src={src}
                                index={index}
                                files={files}
                                previews={previews}
                                setFiles={setFiles}
                                setPreviews={setPreviews}
                            />

                        ))}

                    </div>

                </div>

                <NewLotForm files={files} />

            </div>
        </>
    )
}


export default CreateLotPage
