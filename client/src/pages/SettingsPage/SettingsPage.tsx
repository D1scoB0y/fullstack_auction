import {
    useEffect,
    useState,
} from 'react'

import { Helmet } from 'react-helmet-async'

import styles from './SettingsPage.module.css'

import useUserContext from '@/context/useUserContext'
import useModalsStore from '@/stores/modalsStore'
import { emailVerificationRequest, requestPhoneCall } from '@/services/userServices/userDataVerificationService'
import { updateUser } from '@/services/userServices/userDataManiulationsService'
import {
    checkEmail,
    checkPhone,
    checkUsername,
} from '@/services/userServices/checkUserDataService'

import PageTitle from '@/components/UI/PageTitle/PageTitle'
import Input from '@/components/UI/Form/Input/Input'
import Button from '@/components/UI/Button/Button'
import HiddenErrorMessage from '@/components/UI/Form/ErrorMessage/HiddenErrorMessage'


import EmailVerificatoinModal from '@/components/Modals/Warnings/EmailVerificationModal'
import PhoneVerificationModal from '@/components/Modals/PhoneVerification/PhoneVerificationModal'
import ChangePasswordModal from '@/components/Modals/ChangePassword/ChangePasswordModal'


import useInput from '@/hooks/useInput'
import Line from '@/components/UI/Line/Line'



interface IAfterSubmitErrors {
    username: string
    email: string
    phoneNumber: string
}

const initialAfterSubmitErrors = {
    username: '',
    email: '',
    phoneNumber: '',
}


const SettingsPage = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isFormValid, setIsFormValid] = useState<boolean>(false)
    const [afterSubmitErrors, setAfterSubmitErrors] = useState<IAfterSubmitErrors>(initialAfterSubmitErrors)


    const { token, user, updateUserState } = useUserContext()


    const {
        setEmailWarningModalActive,
        setPhoneVerificationModalActive,
        setChangePasswordModalActive,
    } = useModalsStore()


    const username = useInput('', {required: true, minLength: 3})
    const email = useInput('', {required: true, isEmail: true})
    const phoneNumber = useInput('', {isPhoneNumber: true})


    useEffect(() => {
        if (user) {
            username.setValue(user.username)
            email.setValue(user.email)
            phoneNumber.setValue(user.phone_number || '')
        }
    }, [user])


    useEffect(() => {

        const areValuesOld = (username.value === user?.username) &&
                            (email.value === user?.email) &&
                            (phoneNumber.value === (user?.phone_number || ''))


        const areFieldsValid = [
            username.isValid,
            email.isValid,
            phoneNumber.isValid,
        ].every((el) => el)


        const areAfterSubmitErrors = [
            afterSubmitErrors.email,
            afterSubmitErrors.username,
            afterSubmitErrors.phoneNumber,
        ].some((el) => el)

        setIsFormValid(!areValuesOld && areFieldsValid && !areAfterSubmitErrors)
        
    }, [
        username,
        email,
        phoneNumber,
        afterSubmitErrors,
    ])


    const startEmailConfirmation = () => {
        setEmailWarningModalActive(true)
        emailVerificationRequest(token)
    }

    const startPhoneConfirmation = () => {
        setPhoneVerificationModalActive(true)
        requestPhoneCall(token)
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        setIsLoading(true)

        let isSubmissionСanceled = false

        if (username.value !== user?.username && !await checkUsername(username.value)) {
            setAfterSubmitErrors(prev => ({...prev, username: 'Это имя пользователя уже занято'}))
            isSubmissionСanceled = true
        }

        if (email.value !== user?.email && !await checkEmail(email.value)) {
            setAfterSubmitErrors(prev => ({...prev, email: 'Эта почта уже занята'}))
            isSubmissionСanceled = true
        }

        if (phoneNumber.value) {

            if (phoneNumber.value !== user?.phone_number && !await checkPhone(phoneNumber.value)) {

                setAfterSubmitErrors(prev => ({...prev, phoneNumber: 'Этот номер телефона уже занят'}))
                isSubmissionСanceled = true
            }
        }

        
        if (!isSubmissionСanceled) {

            const freshData = {
                username: username.value,
                email: email.value,
                phone_number: phoneNumber.value,
            }

            if (token) {
                const response = await updateUser(freshData, token)

                if (!response) {
                    setAfterSubmitErrors(prev => ({...prev, password: 'Неверный пароль'}))
                }
            }

            updateUserState()
        }

        setIsLoading(false)
    }

    return (
        <>

            <Helmet>
                <title>Настройки аккаунта | FotoJäger`s Auctions</title>
            </Helmet>

            <PageTitle text='Настройки аккаунта' />

            <form className={styles.form} onSubmit={onSubmit} noValidate>


                <span className={styles.inputLabel}>Имя пользователя</span>

                <HiddenErrorMessage errorText={username.error || afterSubmitErrors.username} />

                <Input
                    value={username.value}
                    onChange={
                        (value: string) => {
                            setAfterSubmitErrors(prev => ({...prev, username: ''}))
                            username.onChange(value)
                        }
                    }
                    maxLength={20}
                />


                <span className={styles.inputLabel}>Электронная почта</span>

                <HiddenErrorMessage errorText={email.error || afterSubmitErrors.email} />

                <div className={styles.fieldContainer}>

                    <Input
                        value={email.value}
                        onChange={
                            (value: string) => {
                                setAfterSubmitErrors(prev => ({...prev, email: ''}))
                                email.onChange(value)
                            }
                        }
                        style={{marginBottom: 0}}
                    />

                    {user?.email_is_verified
                        ? <span className={styles.okSymbol}>✓</span>
                        : (
                            <Button
                                text='Подтвердить'
                                className={styles.requestVerificationButton}
                                disabled={!user?.email}
                                onClick={startEmailConfirmation}
                                preventDefault
                            />
                        )
                    }
                </div>


                <span className={styles.inputLabel}>Номер телефона</span>

                <HiddenErrorMessage errorText={phoneNumber.error || afterSubmitErrors.phoneNumber} />

                <div className={styles.fieldContainer}>

                    <Input
                        value={phoneNumber.value}
                        onChange={
                            (value: string) => {
                                setAfterSubmitErrors(prev => ({...prev, phoneNumber: ''}))
                                phoneNumber.onChange(value)
                            }
                        }
                        maxLength={14}
                        style={{marginBottom: 0}}
                        placeholder='+79999999999'
                        type="tel"
                    />

                    {user?.phone_number_is_verified
                        ? <span className={styles.okSymbol}>✓</span>
                        : (
                            <Button
                                text='Подтвердить'
                                className={styles.requestVerificationButton}
                                onClick={startPhoneConfirmation}
                                disabled={!user?.phone_number}
                                preventDefault
                            />
                        )
                    }
                </div>
                
                {!user?.created_via_google && (

                    <span
                        className={styles.changePasswordHref}
                        onClick={() => setChangePasswordModalActive(true)}
                    >
                        Изменить пароль
                    </span>

                )}

                
                <Line style={{marginTop: 24, marginBottom: 24}} />

                <Button
                    text='Сохранить'
                    className={styles.saveChangesButton}
                    isLoading={isLoading}
                    disabled={!isFormValid}
                    style={{marginTop: 24}}
                />


            </form>

            <EmailVerificatoinModal />
            <PhoneVerificationModal />
            <ChangePasswordModal />
        
        </>
    )
}


export default SettingsPage
