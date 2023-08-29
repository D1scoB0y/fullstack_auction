import {
    useState,
} from 'react'

import { Helmet } from 'react-helmet-async'

import PageTitle from '@/components/UI/PageTitle/PageTitle'


import EmailVerificatoinModal from '@/components/Modals/Warnings/EmailVerificationModal'
import ChangePasswordModal from '@/components/Modals/ChangePassword/ChangePasswordModal'

import SettingsToggleMenu from '@/components/UI/SettingsToggleMenu/SettingsToggleMenu'

import UserDataSection from './UserDataSection/UserDataSection'
import VerificationSection from './VerificationSection/VerificationSection'


const SettingsPage = () => {

    const [pageState, setPageState] = useState<'userData' | 'verification'>('userData')

    return (
        <>

            <Helmet>
                <title>Настройки аккаунта | FotoJäger`s Auctions</title>
            </Helmet>
            

            <PageTitle text='Настройки профиля' />

            <SettingsToggleMenu state={pageState} setState={setPageState} />

            {(pageState === 'userData') ? (
                <UserDataSection />
            ) : (
                <VerificationSection />
            )}

            <EmailVerificatoinModal />
            <ChangePasswordModal />
        
        </>
    )
}


export default SettingsPage
