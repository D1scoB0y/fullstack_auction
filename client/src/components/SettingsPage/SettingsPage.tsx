import { FC, useEffect, useState } from 'react'
import styles from './SettingsPage.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import useAuthStore from '@/stores/AuthStore'
import useUser from '@/stores/useUser'
import { useRouter } from 'next/router'
import { sendPhoneVerificationCallRequest, updateUser } from '@/services/userService'
import { ISettingsData, IUser } from '@/types/user.interface'
import Image from 'next/image'
import IMask from 'imask'
import useStore from '@/stores/useStore'
import PhoneVerificationModal from '../Modals/PhoneVerificationModal'
import { checkEmailIsFree, checkPhoneNumberIsFree, checkUsernameIsFree } from '@/validators/settingsForm'


const SettingsPage: FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showPasswordError, setShowPasswordError] = useState<boolean>(false)
    const [phoneVerificationModalActive, setPhoneVerificationModalActive] = useState<boolean>(false)
    const [user, setUser] = useState<IUser|null>(useUser())

    const token = useStore(useAuthStore, state => state.token)
    const isAuthenticated = useAuthStore(state => state.isAuthenticated)
    const router = useRouter()

    const {register, handleSubmit, reset, formState: {isValid, errors}} = useForm<ISettingsData>({
        mode: "onChange"
    })

    const onSubmit: SubmitHandler<ISettingsData> = async (settingsData) => {
        if (token) {
            const response = await updateUser(settingsData, token)
            setShowPasswordError(!response)
        }
    }

    const onPhoneVerification = async () => {
        if (token) {
            sendPhoneVerificationCallRequest(token)
            setPhoneVerificationModalActive(true)
        }
    }

    useEffect(() => {
        reset({
            username: user?.username,
            email: user?.email,
            phone_number: user?.phone_number || ''
        })
    }, [user])

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/')
        }
    }, [isAuthenticated])

    useEffect(() => {
        const element = document.getElementById('phoneInput')
        const maskOptions = {
            mask: '+{7} 000 000 00 00'
        }
        if (element) {
            IMask(element, maskOptions);
        }
    }, [])

    return (
        <>
            <span className={styles.pageTitle}>Настройки аккаунта</span>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>

                <span className={styles.inputLabel}>Имя пользователя</span>
                {errors.username && <span className={styles.errorMessage}>{errors.username.message}</span>}
                <input
                    {...register('username', {
                        required: 'Заполните это поле',
                        minLength: {
                            value: 3,
                            message: 'Длина - от 3 до 20 символов'
                        },
                        maxLength: {
                            value: 20,
                            message: 'Длина - от 3 до 20 символов'
                        },
                        // @ts-ignore
                        validate: async (username: string) => await checkUsernameIsFree(username, user?.username)
                    })}
                    maxLength={20}
                    className={styles.input}
                    type="text"
                    autoComplete="off"
                />

                <span className={styles.inputLabel}>Электронная почта</span>
                {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
                <div className={styles.fieldContainer}>

                    <input
                        style={{marginBottom: 0}}
                        {...register('email', {
                            required: 'Заполните это поле',
                            pattern: {
                                value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                                message: 'Введите корректный адрес'
                            },
                            // @ts-ignore
                            validate: async (email: string) => await checkEmailIsFree(email, user?.email)
                        })}
                        maxLength={20}
                        className={styles.input}
                        type="text"
                        autoComplete="off"
                    />

                    {user?.email_is_verified
                        ? <span className={styles.okSymbol}>✓</span>
                        : <button type='button' className={styles.confirmButton} onClick={() => {}} disabled={!user?.email}>Подтвердить</button>
                    }

                </div>

                <span className={styles.inputLabel}>Номер телефона</span>
                {errors.phone_number && <span className={styles.errorMessage}>{errors.phone_number.message}</span>}
                <div className={styles.fieldContainer}>
                    <input
                        style={{marginBottom: 0}}
                        id='phoneInput'
                        {...register('phone_number', {
                            required: 'Заполните это поле',
                            // @ts-ignore
                            validate: async (phoneNumber: string) => await checkPhoneNumberIsFree(phoneNumber, user?.phone_number)
                        })}
                        maxLength={20}
                        className={styles.input}
                        type="text"
                        autoComplete="off"
                    />
                    {user?.phone_number_is_verified
                        ? <span className={styles.okSymbol}>✓</span>
                        : <button type='button' className={styles.confirmButton} onClick={() => onPhoneVerification()} disabled={!user?.phone_number}>Подтвердить</button>
                    }
                </div>

                <span className={styles.inputLabel}>Текущий пароль</span>
                {(errors.password || showPasswordError) && <span className={styles.errorMessage}>
                    {showPasswordError ? (
                        <>Неверный пароль</>
                        ) : (errors.email && (
                        <>{errors.email.message}</>
                    ))}
                </span>}
                <div className={styles.passwordFieldContainer}>
                    <input
                        {...register('password', {
                            required: 'Заполните это поле',
                        })}
                        maxLength={50}
                        className={`${styles.input} ${styles.passwordField}`}
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="off"
                    />
                    <Image
                        className={styles.showPasswordIcon}
                        src={showPassword ? '/hide.png' : '/view.png'}
                        alt="eye icon"
                        width={20}
                        height={20}
                        onClick={() => {
                            setShowPassword(prev => !prev)
                        }}
                    />
                </div>

                <button className={styles.submitButton} disabled={!isValid}>Сохранить</button>
            </form>
            <PhoneVerificationModal isActive={phoneVerificationModalActive} setIsActive={setPhoneVerificationModalActive} setUser={setUser}/>
        </>
    )
}


export default SettingsPage
