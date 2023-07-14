import { useEffect, useState } from 'react'
import styles from './SettingsPage.module.css'
import { SubmitHandler, useForm,  } from 'react-hook-form'
import { IRegistrationData } from '@/types/user.interface'
import useAuthStore from '@/store/AuthStore'
import useUser from '@/store/useUser'
import { useRouter } from 'next/router'
import { checkUsername } from '@/service/userService'

const SettingsPage = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const {register, handleSubmit, formState: {isValid, errors}} = useForm<IRegistrationData>({
        mode: "onChange"
    })

    const onSubmit: SubmitHandler<IRegistrationData> = (registrationData) => {
        
    }

    const isAuthenticated = useAuthStore(state => state.isAuthenticated)

    const router = useRouter()

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/')
        }
    }, [isAuthenticated])

    return (
        <>
            <span className={styles.pageTitle}>Настройки аккаунта</span>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                <span className={styles.errorMessage}>{errors.username && <>{errors.username.message}</>}</span>
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
                        validate: async (username: string) => await checkUsername(username) || 'Имя пользователя уже занято',
                    })}
                    
                    maxLength={20}
                    className={styles.input}
                    placeholder={'Имя пользователя'}
                    type="text"
                    autoComplete="off"
                />





            </form>
        </>
    )
}


export default SettingsPage
