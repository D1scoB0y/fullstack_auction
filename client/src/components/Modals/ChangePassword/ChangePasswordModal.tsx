import { useEffect, useState, useCallback } from 'react'

import useUserContext from '@/context/useUserContext'
import useModalsStore from '@/stores/modalsStore'

import { changePassword } from '@/services/userServices/userDataManiulationsService'

import Modal from '../Modal'
import Button from '@/components/UI/Button/Button'
import ErrorMessage from '@/components/UI/Form/ErrorMessage/ErrorMessage'
import PasswordField from '@/components/UI/Form/PasswordField/PasswordField'
import useInput from '@/hooks/useInput'


const ChangePasswordModal = () => {

    const [isValid, setIsValid] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [afterSubmitError, setAfterSubmitError] = useState<string>('')

    const { token } = useUserContext()

    const {
        changePasswordModalActive,
        setChangePasswordModalActive,
    } = useModalsStore()

    const newPassword = useInput('', {required: true, minLength: 8})
    const currentPassword = useInput('', {required: true})


    useEffect(() => {
        const isFieldsValid = newPassword.isValid && currentPassword.isValid

        setIsValid(isFieldsValid && !afterSubmitError)        
    }, [
        newPassword.isValid,
        currentPassword.isValid,
        afterSubmitError,
    ])


    const clearForm = useCallback(() => {
        newPassword.clearField()
        currentPassword.clearField()
    }, [])


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        setIsLoading(true)

        if (token) {

            const isPasswordChanged = await changePassword(
                newPassword.value,
                currentPassword.value,
                token
            )

            if (isPasswordChanged) {
                setChangePasswordModalActive(false)
            } else {
                setAfterSubmitError('Неверный пароль')
            }
        }

        setIsLoading(false)
    }

    return (
        <Modal
            title='Изменение пароля'
            isActive={changePasswordModalActive}
            setIsActive={setChangePasswordModalActive}
            onClose={clearForm}
        >
            <form onSubmit={onSubmit} noValidate>

                <ErrorMessage errorText={newPassword.error} />

                <PasswordField
                    value={newPassword.value}
                    onChange={newPassword.onChange}
                    placeholder='Новый пароль'
                />


                <ErrorMessage errorText={currentPassword.error || afterSubmitError} />

                <PasswordField
                    value={currentPassword.value}
                    onChange={
                        (value: string) => {
                            setAfterSubmitError('')
                            currentPassword.onChange(value)
                        }
                    }
                    placeholder='Текущий пароль'
                />


                <Button
                    text='Сохранить'
                    isLoading={isLoading}
                    disabled={!isValid}
                    style={{width: 300, marginTop: 24}}
                />

            </form>

        </Modal>
    )
}

export default ChangePasswordModal