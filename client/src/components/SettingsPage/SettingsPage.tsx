import { FC, useEffect, useState } from 'react'
import styles from './SettingsPage.module.css'
import { SubmitHandler, useForm,  } from 'react-hook-form'
import { useStore } from 'zustand'
import { ISettingsData } from '../../types/user.interface'
import useAuthStore from '../../stores/authStore'
import useUser from '../../stores/useUser'
import { updateUser, checkEmail, checkPhone, checkUsername } from '../../services/userService'
import useIsAuthenticated from '../../hooks/useIsAuthenticated'
import usePhoneMask from '../../hooks/usePhoneMask'


const SettingsPage: FC = () => {

    useIsAuthenticated()

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [wrongPassword, setWrongPassword] = useState<boolean>(false)

    const user = useUser()

    const {
        register,
        handleSubmit,
        reset,
        resetField,
        formState: {isValid, errors}
    } = useForm<ISettingsData>({
        mode: "onChange",
    })

    useEffect(() => {
        if (user) {
            reset({
                username: user.username,
                phone_number: user.phone_number,
                email: user.email,
            })
        }
    }, [user])

    const token = useStore(useAuthStore, state => state.token)

    const onSubmit: SubmitHandler<ISettingsData> = async (settingsData) => {
        const freshData = {
            username: settingsData.username,
            email: settingsData.email,
            phone_number: settingsData.phone_number,
            password: settingsData.password,
        }

        if (token) {
            const response = await updateUser(freshData, token)
            if (response !== 204) {
                setWrongPassword(true)
                resetField('password')
            }
            resetField('password')
        }
    }

    usePhoneMask('phoneInput')
    
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
                        validate: async (username: string) => username === user?.username || await checkUsername(username) || 'Имя пользователя уже занято',
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
                            validate: async (email: string) => email === user?.email || await checkEmail(email) || 'Эта почта уже занята'
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
                            validate: async (phoneNumber: string) => phoneNumber.replace(' ', '') === user?.phone_number || await checkPhone(phoneNumber) || 'Этот номер уже занят'
                        })}
                        maxLength={20}
                        className={styles.input}
                        type="text"
                        autoComplete="off"
                        onClick={() => console.log(errors)}
                    />
                    {user?.phone_number_is_verified
                        ? <span className={styles.okSymbol}>✓</span>
                        : <button type='button' className={styles.confirmButton} onClick={() => {}} disabled={!user?.phone_number}>Подтвердить</button>
                    }
                </div>

                <span className={styles.inputLabel}>Текущий пароль</span>
                {errors.password && <span className={styles.errorMessage}>
                    {wrongPassword ? (
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
                    <img
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
        </>
    )
}


export default SettingsPage