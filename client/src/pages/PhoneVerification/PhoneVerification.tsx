import { PhoneVerificationForm } from "../../modules/PhoneVerificationForm"
import PageTitle from "../../UI/PageTitle/PageTitle"
import PageMetaInfo from "../../components/PageMetaInfo/PageMetaInfo"


const PhoneVerification = () => {
    return (
        <>
            <PageMetaInfo
                title="Подтверждение номера телефона | FotoJäger`s Auctions"
            />

            <div className="content">
                <PageTitle text="Подтверждение номера телефона" />
                <PhoneVerificationForm />
            </div>
        </>
    )
}

export default PhoneVerification
