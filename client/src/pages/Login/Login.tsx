import { LoginForm } from '../../modules/LoginForm'
import PageTitle from '../../UI/PageTitle/PageTitle'
import PageMetaInfo from '../../components/PageMetaInfo/PageMetaInfo'


const LoginPage = () => {
    return (
        <>
            <PageMetaInfo
                title="Вход в аккаунт | FotoJäger`s Auctions"
            />

            <div className="content">
                <PageTitle text="Вход в аккаунт" />
                <LoginForm />
            </div>
        </>
    )
}

export default LoginPage
