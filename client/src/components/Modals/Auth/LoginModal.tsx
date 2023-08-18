import { useState, useEffect, useCallback } from "react";

import styles from './AuthModal.module.css'

import useInput from "@/hooks/useInput";
import useModalsStore from "@/stores/modalsStore";
import useUserContext from "@/context/useUserContext";

import Input from "@/components/UI/Form/Input/Input";
import Modal from "../Modal";
import Button from "@/components/UI/Button/Button";
import ErrorMessage from "@/components/UI/Form/ErrorMessage/ErrorMessage";
import PasswordField from "@/components/UI/Form/PasswordField/PasswordField";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";


const LoginForm = () => {

    const [isFormValid, setIsFormValid] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [afterSubmitError, setAfterSubmitError] = useState<string>('')
    

    const {
        loginModalActive,
        setLoginModalActive,
        setRegistrationModalActive,
        setResetPasswordModalActive,
    } = useModalsStore()


    const email = useInput('', {required: true})
    const password = useInput('', {required: true})


    useEffect(() => {
        setIsFormValid(email.isValid && password.isValid && !afterSubmitError)
    }, [email.isValid, password.isValid, afterSubmitError])


    const {
        login,
        loginWithGoogle
    } = useUserContext()

    
    const clearForm = useCallback(() => {
        email.clearField()
        password.clearField()
        setAfterSubmitError('')
    }, [])


    const onGoogleSubmit = async (credentialResponse: CredentialResponse) => {

        setIsLoading(true)

        if (credentialResponse.credential) {

            const isLogined = await loginWithGoogle(credentialResponse.credential)

            if (isLogined) {
                setLoginModalActive(false)
            } else {
                setAfterSubmitError('Неверный логин или пароль')
            }
        }

        setIsLoading(false)
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        setIsLoading(true)

        const isLogined = await login({
            email: email.value,
            password: password.value
        })

        if (isLogined) {
            setLoginModalActive(false)
        } else {
            setAfterSubmitError('Неверный логин или пароль')
        }

        setIsLoading(false)
    }
    

    return (
        <Modal
            title="Вход в аккаунт"
            isActive={loginModalActive}
            setIsActive={setLoginModalActive}
            onClose={clearForm}
        >
            <>

                <GoogleLogin
                    onSuccess={onGoogleSubmit}
                    onError={() => setAfterSubmitError('Ошибка. Попробуйте позже')}
                    shape="square"
                    size="large"
                    
                />

                <form className={styles.form} onSubmit={onSubmit} noValidate>

                    <ErrorMessage errorText={email.error || afterSubmitError} />

                    <Input
                        value={email.value}
                        onChange={
                            (value: string) => {
                                setAfterSubmitError('')
                                email.onChange(value)
                            }
                        }
                        placeholder={'Электронная почта'}
                        type="email"
                    />


                    <ErrorMessage errorText={password.error} />

                    <PasswordField
                        value={password.value}
                        onChange={
                            (value: string) => {
                                setAfterSubmitError('')
                                password.onChange(value)
                            }
                        }
                    />


                    <Button
                        text='Войти'
                        isLoading={isLoading}
                        disabled={!isFormValid}
                        style={{marginTop: 24}}
                    />
                </form>
                    
                
                <span
                    className={styles.resetPasswordHref}
                    onClick={() => {
                        setLoginModalActive(false)
                        setResetPasswordModalActive(true)
                    }}
                >
                    Сброс пароля
                </span>

                <div className={styles.underFormInfo}>
                    <span className={styles.underFormText}>Нет аккаунта?</span>
                    <span 
                        className={styles.underFormHref}
                        onClick={() => {
                            setLoginModalActive(false)
                            setRegistrationModalActive(true)
                        }}
                    >
                        Создать
                    </span>
                </div>

                
            </>
        </Modal>
    )   
}


export default LoginForm
