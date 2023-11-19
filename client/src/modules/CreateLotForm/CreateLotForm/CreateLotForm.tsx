import { useState } from "react"
import FileDropzone from "../components/FileDropzone/FileDropzone"
import styles from './CreateLotForm.module.css'
import LotInfoForm from "../components/LotInfoForm/LotInfoForm"
import ImagePreviews from "../components/ImagePreviews/ImagePreviews"


const CreateLotForm = () => {
    const [files, setFiles] = useState<File[]>([])
    const [previews, setPreviews] = useState<string[]>([])

    return (
        <div className={styles.newLotFormContainer}>
            <div>
                <FileDropzone
                    loadedFilesQty={files.length}
                    setFiles={setFiles}
                    setPreviews={setPreviews}
                />

                <ImagePreviews
                    files={files}
                    setFiles={setFiles}
                    previews={previews}
                    setPreviews={setPreviews}
                />
            </div>

            <LotInfoForm
                files={files}
            />
        </div>
    )
}

export { CreateLotForm }
