import { useSearchParams } from "react-router-dom";
import PageTitle from "../../UI/PageTitle/PageTitle";
import { ResetPasswordForm } from "../../modules/ResetPasswordForm";
import PageMetaInfo from "../../components/PageMetaInfo/PageMetaInfo";


const pageTitle = "Сброс пароля (Шаг 2/2)"

const ResetPasswordStep2 = () => {
    const [ params ] = useSearchParams()
    const token = params.get('token')

    return (
        <>
            <PageMetaInfo
                title={`${pageTitle} | FotoJäger\`s Auctions`}
            />

            <div className="content">
                <PageTitle text={pageTitle} />
                <ResetPasswordForm
                    token={token}
                />
            </div>
        </>
    )
}

export default ResetPasswordStep2
