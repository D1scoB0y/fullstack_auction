import React, { useEffect, useState } from 'react'

import styles from './WarningModal.module.css'

import useInput from '@/hooks/useInput'
import useModalsStore from '@/stores/modalsStore'

import { requestPasswordReset } from '@/services/userServices/userDataManiulationsService'

import Modal from '../Modal'
import Button from '@/components/UI/Button/Button'
import Input from '@/components/UI/Form/Input/Input'
import ErrorMessage from '@/components/UI/Form/ErrorMessage/ErrorMessage'


const ResetPasswordModal = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [afterSubmitError, setAfterSubmitError] = useState<string>('')
    const [isValid, setIsValid] = useState<boolean>(false)


    const {
        resetPasswordModalActive,
        setResetPasswordModalActive
    } = useModalsStore()


    const email = useInput('', {required: true, isEmail: true})


    useEffect(() => {
        setIsValid(email.isValid && !afterSubmitError)
    }, [email.isValid, afterSubmitError])


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        setIsLoading(true)

        const isPasswordResetRequested = await requestPasswordReset(email.value) 

        if (isPasswordResetRequested) {
            setResetPasswordModalActive(false)
        } else {
            setAfterSubmitError('Почта не найдена')
        }

        setIsLoading(false)
    }

    
    return (
        <Modal
            title='Сброс пароля'
            isActive={resetPasswordModalActive}
            setIsActive={setResetPasswordModalActive}
            onClose={email.clearField}
        >       
            <span className={styles.warningText}>Укажите свою почту и мы отправим посьмо для сброса пароля.</span>

            <form onSubmit={onSubmit} noValidate>

                <ErrorMessage errorText={email.error || afterSubmitError} />

                <Input
                    value={email.value}
                    onChange={
                        (value: string) => {
                            setAfterSubmitError('')
                            email.onChange(value)
                        }
                    }
                    placeholder='Электронная почта'
                />

                <Button
                    text='Отправить'
                    isLoading={isLoading}
                    style={{width: 300, marginTop: 24}}
                    disabled={!isValid}
                />
            </form>

        </Modal>
    )
}


export default ResetPasswordModal
