import {
    useState,
} from 'react'

import { Helmet } from 'react-helmet-async'

import PageTitle from '@/components/UI/PageTitle/PageTitle'

import ChangePasswordModal from '@/components/Modals/ChangePassword/ChangePasswordModal'

import ToggleMenu from '@/components/UI/ToggleMenu/ToggleMenu'

import UserDataSection from './UserDataSection/UserDataSection'
import VerificationSection from './VerificationSection/VerificationSection'


const SettingsPage = () => {

    const [menuToggled, setMenuToggled] = useState<boolean>(false)

    return (
        <>

            <Helmet>
                <title>Настройки аккаунта | FotoJäger`s Auctions</title>
            </Helmet>
            

            <PageTitle text='Настройки профиля' />

            <ToggleMenu options={['Личные данные', 'Верификация']} toggled={menuToggled} setToggled={setMenuToggled} />

            {!menuToggled ? (
                <UserDataSection />
            ) : (
                <VerificationSection />
            )}

            <ChangePasswordModal />
        
        </>
    )
}


export default SettingsPage
