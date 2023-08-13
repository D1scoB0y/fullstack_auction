import { useCallback, useEffect, useState } from "react";

import styles from './AuthModal.module.css'

import useRegistrationFormHandlers, { IFormData, IFormErrors } from "@/hooks/useRegistrationFormHandlers";
import useModalsStore from "@/stores/modalsStore";
import { checkEmail, checkUsername } from "@/services/userServices/checkUserDataService";

import ModalLoaderOverlay from "@/components/UI/ModalLoaderOverlay/ModalLoaderOverlay";
import ShowPasswordButton from "@/components/UI/Form/ShowPasswordButton/ShowPasswordButton";
import Input from "@/components/UI/Form/Input/Input";
import Modal from "../Modal";
import useUserContext from "@/context/useUserContext";
import Button from "@/components/UI/Button/Button";


const initialFormData = {
    username: '',
    email: '',
    password: '',
}

const initialFormErrors = initialFormData


const RegistrationModal = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isFormValid, setIsFormValid] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<IFormData>(initialFormData)
    const [errors, setErrors] = useState<IFormErrors>(initialFormErrors)
    
    useEffect(() => {
        const isErrors = errors.username || errors.email || errors.password 

        if (isErrors || formData.password.length === 0) {
            setIsFormValid(false)
        } else {
            setIsFormValid(true)
        }
    }, [errors])

    const {
        registrationModalActive,
        setLoginModalActive,
        setRegistrationModalActive
    } = useModalsStore()

    const {
        usernameHandler,
        emailHandler,
        passwordHandler,
    } = useRegistrationFormHandlers(setFormData, setErrors)

    const clearForm = useCallback(() => {
        setFormData(initialFormData)
    }, [])


    const { registration } = useUserContext()


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        setIsLoading(true)

        let isSubmissionСanceled = false

        if (!await checkUsername(formData.username)) {
            setErrors(prev => ({...prev, username: 'Это имя пользователя уже занято'}))
            isSubmissionСanceled = true
        }

        if (!await checkEmail(formData.email)) {
            setErrors(prev => ({...prev, email: 'Эта почта уже занята'}))
            isSubmissionСanceled = true
        }

        if (!isSubmissionСanceled) {
            await registration(formData)

            clearForm()
            setRegistrationModalActive(false)
        }

        setFormData(prev => ({...prev, password: ''}))
        setIsLoading(false)
    }

    return (
        <Modal isActive={registrationModalActive} setIsActive={setRegistrationModalActive}>
            <>
                <span className={styles.formTitle}>Регистрация</span>

                <form onSubmit={onSubmit} noValidate>

                    <span className={styles.errorMessage}>{errors.username}</span>

                    <Input
                        value={formData.username}
                        onChange={(e) => usernameHandler(e.target.value)}
                        maxLength={20}
                        placeholder={'Имя пользователя'}
                    />

                    <span className={styles.errorMessage}>{errors.email}</span>

                    <Input
                        value={formData.email}
                        onChange={(e) => emailHandler(e.target.value)}
                        placeholder={'Электронная почта'}
                    />

                    <span className={styles.errorMessage}>{errors.password}</span> 

                    <div className={styles.passwordFieldContainer}>
                        <Input
                            value={formData.password}
                            onChange={(e) => passwordHandler(e.target.value)}
                            maxLength={50}
                            className={styles.passwordField}
                            placeholder={'Пароль'}
                            type={showPassword ? 'text' : 'password'}
                            style={{marginBottom: 0}}
                        />

                        <ShowPasswordButton
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                        />
                    </div>
                    
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
            </>
        </Modal>                  
    )
}


export default RegistrationModal
