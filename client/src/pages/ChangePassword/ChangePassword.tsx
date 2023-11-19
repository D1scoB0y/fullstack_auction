import PageTitle from "../../UI/PageTitle/PageTitle"
import PageMetaInfo from "../../components/PageMetaInfo/PageMetaInfo"
import { ChangePasswordForm } from "../../modules/ChangePasswordForm"


const ChangePassword = () => {
    return (
        <>
            <PageMetaInfo
                title="Изменение пароля | FotoJäger`s Auction"
            />

            <div className='content'>
                <PageTitle text="Изменение пароля" />
                <ChangePasswordForm />
            </div>
        </>
    )
}

export default ChangePassword
