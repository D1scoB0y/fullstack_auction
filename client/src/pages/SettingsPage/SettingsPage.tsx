import {
    SetStateAction,
    useEffect,
    Dispatch,
    useState,
} from 'react'

import styles from './SettingsPage.module.css'


import useSettingsFormHandlers, { IFormData, IFormErrors } from '@/hooks/useSettingsFormHandlers'
import useModalsStore from '@/stores/modalsStore'
import { emailVerificationRequest } from '@/services/userServices/userDataVerificationService'
import { getUser } from '@/services/userServices/helperService'
import { updateUser } from '@/services/userServices/userDataManiulationsService'
import {
    checkEmail,
    checkPhone,
    checkUsername,
} from '@/services/userServices/checkUserDataService'

import { IUser } from '@/types/user.interface'

import ShowPasswordButton from '@/components/UI/Form/ShowPasswordButton/ShowPasswordButton'
import SubmitButton from '@/components/UI/Form/SubmitButton/SubmitButton'
import PageTitle from '@/components/UI/PageTitle/PageTitle'
import Loader from '@/components/UI/Loader/Loader'
import Input from '@/components/UI/Form/Input/Input'
import Button from '@/components/UI/Button/Button'
import EmailModal from '@/components/Modals/Warnings/EmailModal'
import useUserContext from '@/context/useUserContext'


const updateUserState = async (
    token: string|null,
    setUser: Dispatch<SetStateAction<IUser|null>>
) => {
    if (token) {

        const fetchedUser = await getUser(token)

        if (fetchedUser) {
            setUser(fetchedUser)
        }
    }
}

const initialFormData = {
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
}

const initialFormErrors = initialFormData


const SettingsPage = () => {

    const [user, setUser] = useState<IUser|null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isFormValid, setIsFormValid] = useState<boolean>(false)

    const [formData, setFormData] = useState<IFormData>(initialFormData)
    const [errors, setErrors] = useState<IFormErrors>(initialFormErrors)

    const { token } = useUserContext()

    useEffect(() => {
        updateUserState(token, setUser)
    }, [token])

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                username: user.username,
                email: user.email,
                phoneNumber: user.phone_number || '',
            }))
        }
    }, [user])

    useEffect(() => {

        const isErrors = errors.username || errors.email || errors.phoneNumber || errors.password 

        if (isErrors || formData.password.length === 0) {
            setIsFormValid(false)
        } else {
            setIsFormValid(true)
        }
    }, [errors, formData.password])

    const {
        usernameHandler,
        emailHandler,
        phoneNumberHandler,
        passwordHandler
    } = useSettingsFormHandlers(setFormData, setErrors)

    const {
        setEmailWarningModalActive,
    } = useModalsStore()

    const startEmailConfirmation = (e: React.MouseEvent<HTMLElement>) => {

        e.preventDefault()

        setEmailWarningModalActive(true)
        emailVerificationRequest(token)
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        setIsLoading(true)

        let isSubmissionСanceled = false

        if (formData.username !== user?.username && !await checkUsername(formData.username)) {
            setErrors(prev => ({...prev, username: 'Это имя пользователя уже занято'}))
            isSubmissionСanceled = true
        }

        if (formData.email !== user?.email && !await checkEmail(formData.email)) {
            setErrors(prev => ({...prev, email: 'Эта почта уже занята'}))
            isSubmissionСanceled = true
        }

        if (formData.phoneNumber) {

            if (formData.phoneNumber !== user?.phone_number && !await checkPhone(formData.phoneNumber)) {

                setErrors(prev => ({...prev, phoneNumber: 'Этот номер телефона уже занят'}))
                isSubmissionСanceled = true
            }
        }

        
        if (!isSubmissionСanceled) {

            const freshData = {
                username: formData.username,
                email: formData.email,
                phone_number: formData.phoneNumber,
                password: formData.password,
            }

            if (token) {
                const response = await updateUser(freshData, token)

                if (!response) {
                    setErrors(prev => ({...prev, password: 'Неверный пароль'}))
                }
            }

            updateUserState(token, setUser)
        }

        setFormData(prev => ({...prev, password: ''}))

        setIsLoading(false)
    }

    return (
        <>
            <PageTitle text='Настройки аккаунта' />

            <form className={styles.form} onSubmit={onSubmit} noValidate>


                <span className={styles.inputLabel}>Имя пользователя</span>

                {errors.username && <span className={styles.errorMessage}>{errors.username}</span>}

                <Input
                    value={formData.username}
                    onChange={(e) => usernameHandler(e.target.value)}
                    maxLength={20}
                />


                <span className={styles.inputLabel}>Электронная почта</span>

                {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}

                <div className={styles.fieldContainer}>

                    <Input
                        value={formData.email}
                        onChange={(e) => emailHandler(e.target.value)}
                        style={{marginBottom: 0}}
                    />

                    {user?.email_is_verified
                        ? <span className={styles.okSymbol}>✓</span>
                        : (
                            <Button
                                text='Подтвердить'
                                disabled={!user?.email}
                                onClick={startEmailConfirmation}
                                style={{marginLeft: 24}}
                            />
                        )
                    }
                </div>


                <span className={styles.inputLabel}>Номер телефона</span>

                {errors.phoneNumber && <span className={styles.errorMessage}>{errors.phoneNumber}</span>}

                <div className={styles.fieldContainer}>

                    <Input
                        value={formData.phoneNumber}
                        onChange={(e) => phoneNumberHandler(e.target.value)}
                        maxLength={14}
                        style={{marginBottom: 0}}
                        placeholder='+79999999999'
                        type="tel"
                    />

                    {user?.phone_number_is_verified
                        ? <span className={styles.okSymbol}>✓</span>
                        : <button type='button' className={styles.confirmButton} disabled={!user?.phone_number}>Подтвердить</button>
                    }
                </div>


                <span className={styles.inputLabel}>Текущий пароль</span>

                {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}

                <div className={styles.passwordFieldContainer}>

                    <Input
                        value={formData.password}
                        onChange={(e) => passwordHandler(e.target.value)}
                        maxLength={50}
                        style={{marginBottom: 0}}
                        type={showPassword ? 'text' : 'password'}
                    />

                    <ShowPasswordButton
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                    />
                </div>
                

                <div className={styles.submitButtonContainer}>
                    
                    <SubmitButton
                        text='Сохранить'
                        disabled={!isFormValid}
                    />

                    {isLoading && <Loader
                        width={40}
                        height={40}
                        style={{marginTop: 24, marginLeft: 24}}
                    />}
                </div>

            </form>

            <EmailModal />
        </>
    )
}


export default SettingsPage
