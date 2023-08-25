import { useEffect, useState } from 'react'

import { useNavigate, useSearchParams } from 'react-router-dom'

import styles from './ResetPasswordPage.module.css'

import useInput from "@/hooks/useInput"
import { resetPassword } from "@/services/userServices/userDataManiulationsService"
import useModalsStore from '@/stores/modalsStore'

import PageTitle from "@/components/UI/PageTitle/PageTitle"
import Button from '@/components/UI/Button/Button'
import PasswordField from '@/components/UI/Form/PasswordField/PasswordField'
import HiddenErrorMessage from '@/components/UI/Form/HiddenErrorMessage/HiddenErrorMessage'


const ResetPasswordPage = () => {

    const newPassword = useInput('', {required: true, minLength: 8})
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [afterSubmitError, setAfterSubmitError] = useState<string>('')
    const [isValid, setIsValid] = useState<boolean>(false)


    const [params] = useSearchParams()

    const token = params.get('token')

    
    const {
        setLoginModalActive,
    } = useModalsStore()

    const navigate = useNavigate()

    useEffect(() => {
        setIsValid(newPassword.isValid && !afterSubmitError)
    }, [newPassword.isValid, afterSubmitError])

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        setIsLoading(true)

        if (token) {
            const isPasswordReseted = await resetPassword(token, newPassword.value)

            if (isPasswordReseted) {
                navigate('/')
                setLoginModalActive(true)
            } else {
                setAfterSubmitError('Ошибка. Попробуйте позже')
            }

        }

        setIsLoading(false)
    }

    return (
        <>
            <PageTitle text='Сброс пароля'/>

            <form className={styles.form} onSubmit={onSubmit} noValidate>

                <span className={styles.inputLabel}>Новый пароль</span>

                <HiddenErrorMessage errorText={newPassword.error || afterSubmitError}/>

                <PasswordField
                    value={newPassword.value}
                    onChange={
                        (value: string) => {
                            setAfterSubmitError('')
                            newPassword.onChange(value)
                        }
                    }
                    placeholder=''
                />

                <div className={styles.submitButtonContainer}>

                    <Button
                        text='Сохранить'
                        disabled={!isValid}
                        isLoading={isLoading}
                        style={{width: 300, marginTop: 12}}
                    />

                </div>

            </form>
        </>
    )
}

export default ResetPasswordPage