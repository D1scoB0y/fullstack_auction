import PageTitle from "../../UI/PageTitle/PageTitle"
import PageMetaInfo from "../../components/PageMetaInfo/PageMetaInfo"
import { RegistrationForm } from "../../modules/RegistrationForm"


const Registration = () => {
    return (
        <>
            <PageMetaInfo
                title="Создание аккаунта | FotoJäger`s Auctions"
            />

            <div className="content">
                <PageTitle text="Регистрация" />
                <RegistrationForm />
            </div>
        </>
    )
}

export default Registration