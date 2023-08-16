import { useCallback, useEffect, useState } from "react";

import styles from './AuthModal.module.css'

import useModalsStore from "@/stores/modalsStore";
import { checkEmail, checkUsername } from "@/services/userServices/checkUserDataService";

import ModalLoaderOverlay from "@/components/UI/ModalLoaderOverlay/ModalLoaderOverlay";
import Input from "@/components/UI/Form/Input/Input";
import Modal from "../Modal";
import useUserContext from "@/context/useUserContext";
import Button from "@/components/UI/Button/Button";
import ErrorMessage from "@/components/UI/Form/ErrorMessage/ErrorMessage";
import PasswordField from "@/components/UI/Form/PasswordField/PasswordField";
import useInput from "@/hooks/useInput";


interface IAfterSubmitErrors {
    username: string
    email: string 
}

const initialAfterSubmitErrors = {
    username: '',
    email: '',
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
            await registration({
                username: username.value,
                email: email.value,
                password: password.value,
            })

            clearForm()
            setRegistrationModalActive(false)
        } else {
            password.clearField()
        }

        setIsLoading(false)
    }

    return (
        <Modal
            title="Регистрация"
            isActive={registrationModalActive}
            setIsActive={setRegistrationModalActive}
        >
            <form onSubmit={onSubmit} noValidate>

                <ErrorMessage errorText={username.error || afterSubmitErrors.username} />

                <Input
                    value={username.value}
                    onChange={
                        (value: string) => {
                            setAfterSubmitErrors(prev => ({...prev, username: ''}))
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
                            setAfterSubmitErrors(prev => ({...prev, email: ''}))
                            email.onChange(value)
                        }
                    }
                    placeholder='Электронная почта'
                />

                <ErrorMessage errorText={password.error} />

                <PasswordField
                    value={password.value}
                    onChange={password.onChange}
                />
                

                <Button
                    text='Создать аккаунт'
                    disabled={!isFormValid}
                    style={{width: 300, marginTop: 24}}
                />
            </form>

            <div className={styles.underFormInfo}>
                <span className={styles.underFormText}>Уже есть аккаунт?</span>
                <span 
                    className={styles.underFormHref}
                    onClick={() => {
                        clearForm()
                        setRegistrationModalActive(false)
                        setLoginModalActive(true)
                    }}
                >
                    Войти
                </span>
            </div>

            {isLoading && <ModalLoaderOverlay />} 
        </Modal>                  
    )
}


export default RegistrationModal
