import { useEffect, useState } from 'react'

import styles from './ChangePasswordModal.module.css'

import useModalsStore from '@/stores/modalsStore'

import { changePassword } from '@/services/userServices/userDataManiulationsService'

import Modal from '../Modal'
import ModalLoaderOverlay from '@/components/UI/ModalLoaderOverlay/ModalLoaderOverlay'
import Input from '@/components/UI/Form/Input/Input'
import ShowPasswordButton from '@/components/UI/Form/ShowPasswordButton/ShowPasswordButton'
import Button from '@/components/UI/Button/Button'
import useUserContext from '@/context/useUserContext'


interface IFormData {
    newPassword: string
    currentPassword: string
}

const initialFormData = {
    newPassword: '',
    currentPassword: '',
}

const initialFormErrors = initialFormData

const ChangePasswordModal = () => {

    const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
    const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false)
    const [isValid, setIsValid] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<IFormData>(initialFormData)
    const [errors, setErrors] = useState<IFormData>(initialFormErrors)

    const { token } = useUserContext()

    const {
        changePasswordModalActive,
        setChangePasswordModalActive,
    } = useModalsStore()

    useEffect(() => {
        const isError = errors.newPassword || errors.currentPassword

        const isFiledsFilled = formData.currentPassword && formData.newPassword

        if (isError || !isFiledsFilled) {
            setIsValid(false)
        } else {
            setIsValid(true)
        }

    }, [errors, formData])


    const handleNewPassword = async (newPassword: string) => {

        setFormData(prev => ({...prev, newPassword: newPassword}))

        if (newPassword.length === 0) {
            setErrors(prev => ({...prev, newPassword: 'Заполните это поле'}))
            return
        }

        if (newPassword.length < 8) {
            setErrors(prev => ({...prev, newPassword: 'Минимальная длина 8 символов'}))
            return
        }

        setErrors(prev => ({...prev, newPassword: ''}))
    }

    const handleCurrentPassword = async (currentPassword: string) => {

        setFormData(prev => ({...prev, currentPassword: currentPassword}))

        if (currentPassword.length === 0) {
            setErrors(prev => ({...prev, currentPassword: 'Заполните это поле'}))
            return
        }

        setErrors(prev => ({...prev, currentPassword: ''}))
    }


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        setIsLoading(true)
        
        if (token) {
            const isPasswordChanged = await changePassword(formData.newPassword, formData.currentPassword, token)

            if (isPasswordChanged) {
                setChangePasswordModalActive(false)
                setFormData(initialFormData)
            } else {
                setErrors(prev => ({...prev, currentPassword: 'Неверный пароль'}))
                setFormData(prev => ({...prev, currentPassword: ''}))
            }
        }

        setIsLoading(false)
    }

    return (
        <Modal isActive={changePasswordModalActive} setIsActive={setChangePasswordModalActive}>
            
            <span className={styles.modalTitle}>Изменение пароля</span>

            <form onSubmit={onSubmit} noValidate>

                <span className={styles.errorMessage}>{errors.newPassword}</span>

                <div className={styles.passwordFieldContainer}>

                    <Input
                        value={formData.newPassword}
                        onChange={(e) => handleNewPassword(e.target.value)}
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder='Новый пароль'
                        style={{marginBottom: 0}}
                    />

                    <ShowPasswordButton
                        showPassword={showNewPassword}
                        setShowPassword={() => setShowNewPassword(prev => !prev)}
                    />
                </div>


                <span className={styles.errorMessage}>{errors.currentPassword}</span>

                <div className={styles.passwordFieldContainer}>

                    <Input
                        value={formData.currentPassword}
                        onChange={(e) => handleCurrentPassword(e.target.value)}
                        type={showCurrentPassword ? 'text' : 'password'}
                        placeholder='Текущий пароль'
                        style={{marginBottom: 0}}
                    />

                    <ShowPasswordButton
                        showPassword={showCurrentPassword}
                        setShowPassword={() => setShowCurrentPassword(prev => !prev)}
                    />
                </div>

                <Button
                    text='Сохранить'
                    disabled={!isValid}
                    style={{width: 300, marginTop: 24}}
                />

            </form>

            {isLoading && <ModalLoaderOverlay />}

        </Modal>
    )
}

export default ChangePasswordModal