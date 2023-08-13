import { useState, useEffect, useCallback } from "react";

import styles from './AuthModal.module.css'

import useLoginFormHandlers, { IFormData, IFormErrors } from "@/hooks/useLoginFormHadlers";
import useModalsStore from "@/stores/modalsStore";

import ShowPasswordButton from "@/components/UI/Form/ShowPasswordButton/ShowPasswordButton";
import ModalLoaderOverlay from "@/components/UI/ModalLoaderOverlay/ModalLoaderOverlay";
import Input from "@/components/UI/Form/Input/Input";
import Modal from "../Modal";
import useUserContext from "@/context/useUserContext";
import Button from "@/components/UI/Button/Button";


const initialFormData = {
    email: '',
    password: '',
}

const initialFormErrors = initialFormData


const LoginForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isFormValid, setIsFormValid] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<IFormData>(initialFormData)
    const [errors, setErrors] = useState<IFormErrors>(initialFormErrors)
    
    const {
        loginModalActive,
        setLoginModalActive,
        setRegistrationModalActive
    } = useModalsStore()


    useEffect(() => {
        const isErrors = errors.email || errors.password 

        if (isErrors || formData.password.length === 0) {
            setIsFormValid(false)
        } else {
            setIsFormValid(true)
        }
    }, [errors])

    const {
        emailHandler,
        passwordHandler,
    } = useLoginFormHandlers(setFormData, setErrors)

    const clearForm = useCallback(() => {
        setFormData(initialFormData)
    }, [])


    const { login } = useUserContext()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        setIsLoading(true)

        const isLogined = await login(formData)

        if (isLogined) {
            clearForm()
            setLoginModalActive(false)
        } else {
            setErrors(prev => ({...prev, email: 'Неверный логин или пароль'}))
        }

        setIsLoading(false)
    }
    

    return (
        <Modal isActive={loginModalActive} setIsActive={setLoginModalActive}>
            <>
                <span className={styles.formTitle}>Вход</span>

                <form onSubmit={onSubmit} noValidate>

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
                        text='Войти'
                        disabled={!isFormValid}
                        style={{width: 300, marginTop: 24}}
                    />
                </form>
                
                <div className={styles.underFormInfo}>
                    <span className={styles.underFormText}>Нет аккаунта?</span>
                    <span 
                        className={styles.underFormHref}
                        onClick={() => {
                            clearForm()
                            setLoginModalActive(false)
                            setRegistrationModalActive(true)
                        }}
                    >
                        Зарегистрироваться
                    </span>
                </div>

                {isLoading && <ModalLoaderOverlay />}
            </>
        </Modal>
    )   
}


export default LoginForm
