import PageTitle from "../../UI/PageTitle/PageTitle";
import PageMetaInfo from "../../components/PageMetaInfo/PageMetaInfo";
import { EmailForm } from "../../modules/EmailForm";


const ResetPasswordStep1 = () => {
    return (
        <>
            <PageMetaInfo
                title="Сброс пароля (Шаг 1/2) | FotoJäger`s Auctions"
            />

            <div className="content">
                <PageTitle text="Сброс пароля (Шаг 1/2)" />
                <EmailForm />
            </div>
        </>
    )
}

export default ResetPasswordStep1
