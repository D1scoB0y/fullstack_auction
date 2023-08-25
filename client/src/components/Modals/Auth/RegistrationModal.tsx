import { useCallback, useEffect, useState } from "react";

import styles from './AuthModal.module.css'

import useModalsStore from "@/stores/modalsStore";
import { checkEmail, checkUsername } from "@/services/userServices/checkUserDataService";

import Input from "@/components/UI/Form/Input/Input";
import Modal from "../Modal";
import useUserContext from "@/context/useUserContext";
import Button from "@/components/UI/Button/Button";
import ErrorMessage from "@/components/UI/Form/ErrorMessage/ErrorMessage";
import PasswordField from "@/components/UI/Form/PasswordField/PasswordField";
import useInput from "@/hooks/useInput";
import GoogleButton from "@/components/UI/GoogleButton/GoogleButton";
import Line from "@/components/UI/Line/Line";


interface IAfterSubmitErrors {
    username: string
    email: string 
    server: string
}

const initialAfterSubmitErrors = {
    username: '',
    email: '',
    server: '',
}

const RegistrationModal = () => {

    const [isFormValid, setIsFormValid] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [afterSubmitErrors, setAfterSubmitErrors] = useState<IAfterSubmitErrors>(initialAfterSubmitErrors)


    const {
        registrationModalActive,
        setLoginModalActive,
        setRegistrationModalActive
    } = useModalsStore()


    const username = useInput('', {required: true, minLength: 3, avoidSpecialSymbols: true})
    const email = useInput('', {required: true, isEmail: true})
    const password = useInput('', {required: true, minLength: 8})


    useEffect(() => {
        const isFieldsValid = username.isValid && email.isValid && password.isValid

        const isAfterSubmitErrors = afterSubmitErrors.username || afterSubmitErrors.email

        setIsFormValid(isFieldsValid && !isAfterSubmitErrors)
    },
    [
        username.isValid,
        email.isValid,
        password.isValid,
        afterSubmitErrors
    ])


    const clearForm = useCallback(() => {
        username.clearField()
        email.clearField()
        password.clearField()
        setAfterSubmitErrors(initialAfterSubmitErrors)
    }, [])


    const { registration } = useUserContext()


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        setIsLoading(true)

        let isSubmissionСanceled = false

        if (!await checkUsername(username.value)) {
            setAfterSubmitErrors(prev => ({...prev, username: 'Это имя пользователя уже занято'}))
            isSubmissionСanceled = true
        }

        if (!await checkEmail(email.value)) {
            setAfterSubmitErrors(prev => ({...prev, email: 'Эта почта уже занята'}))
            isSubmissionСanceled = true
        }

        if (!isSubmissionСanceled) {

            const isRegistered = await registration({
                username: username.value,
                email: email.value,
                password: password.value,
            })

            if (isRegistered) {
                setRegistrationModalActive(false)
            } else {
                setAfterSubmitErrors(prev => ({...prev, server: 'Ошибка. Попробуйте еще'}))
            }
        }

        setIsLoading(false)
    }

    return (
        <Modal
            title="Регистрация"
            isActive={registrationModalActive}
            setIsActive={setRegistrationModalActive}
            onClose={clearForm}
        >
            <form className={styles.form} onSubmit={onSubmit} noValidate>

                <GoogleButton
                    setIsLoading={setIsLoading}
                    setAfterSubmitError={
                        (error: string) => setAfterSubmitErrors(prev => ({...prev, server: error}))
                    }
                />

                <Line style={{marginTop: 24, marginBottom: 24}} />

                <ErrorMessage errorText={username.error || afterSubmitErrors.username || afterSubmitErrors.server} />

                <Input
                    value={username.value}
                    onChange={
                        (value: string) => {
                            setAfterSubmitErrors(prev => ({...prev, username: '', server: ''}))
                            username.onChange(value)
                        }
                    }
                    maxLength={20}
                    placeholder='Имя пользователя'
                />

                <ErrorMessage errorText={email.error || afterSubmitErrors.email} />

                <Input
                    value={email.value}
                    onChange={
                        (value: string) => {
                            setAfterSubmitErrors(prev => ({...prev, email: '', server: ''}))
                            email.onChange(value)
                        }
                    }
                    placeholder='Электронная почта'
                    type="email"
                />

                <ErrorMessage errorText={password.error} />

                <PasswordField
                    value={password.value}
                    onChange={password.onChange}
                />
                

                <Button
                    text='Создать аккаунт'
                    isLoading={isLoading}
                    disabled={!isFormValid}
                    style={{marginTop: 24}}
                />
            </form>

            <div className={styles.underFormInfo}>
                <span className={styles.underFormText}>Уже есть аккаунт?</span>
                <span 
                    className={styles.underFormHref}
                    onClick={() => {
                        setRegistrationModalActive(false)
                        setLoginModalActive(true)
                    }}
                >
                    Войти
                </span>
            </div>

        </Modal>                  
    )
}


export default RegistrationModal
