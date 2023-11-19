import PageMetaInfo from "../../components/PageMetaInfo/PageMetaInfo"
import PageTitle from "../../UI/PageTitle/PageTitle"
import { CreateLotForm } from "../../modules/CreateLotForm"


const CreateLot = () => {
    return (
        <>
            <PageMetaInfo
                title="Новый лот | FotoJäger`s Auction"
            />

            <div className="content">
                <PageTitle text="Новый лот" />
                <CreateLotForm />
            </div>
        </>
    )
}

export default CreateLot
