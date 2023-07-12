import { Dispatch, FC, SetStateAction, useState } from "react";
import Portal from "../Portal";
import styles from './Modal.module.css'
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";

type Props = {
    isActive: boolean,
    setIsActive: Dispatch<SetStateAction<boolean>>,
    setLoginFormActive: Dispatch<SetStateAction<boolean>>,
}

interface IRegistrationFields {
    username: string
    email: string
    password: string
    confirmPassword: string
}

const RegistrationModal: FC<Props> = ({isActive, setIsActive, setLoginFormActive}) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const {register, handleSubmit, reset, watch,formState: {isValid, errors}} = useForm<IRegistrationFields>({
        mode: "onChange"
    })

    const onSubmit: SubmitHandler<IRegistrationFields> = (data) => {
        reset()
        console.log(data)
    }

    return (
        <>
            {isActive && (
                <Portal>
                    <div className={styles.overlay} onClick={() => {reset(); setIsActive(false)}}>
                        <div className={styles.modalBody} onClick={e => e.stopPropagation()}>
                            <span className={styles.modalTitle}>Регистрация</span>

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
                                    })}
                                    maxLength={20}
                                    className={styles.input}
                                    placeholder={'Имя пользователя'}
                                    type="text"
                                    autoComplete="off"
                                />

                                <span className={styles.errorMessage}>{errors.email && <>{errors.email.message}</>}</span>

                                <input
                                    {...register('email', {
                                        required: 'Заполните это поле',
                                        pattern: {
                                            value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                                            message: 'Введите корректный адрес'
                                        }
                                    })}
                                    className={styles.input}
                                    placeholder={'Электронная почта'}
                                    type="text"
                                    autoComplete="off"
                                />

                                <span className={styles.errorMessage}>{errors.password && <>{errors.password.message}</>}</span>  
                                
                                <div className={styles.passwordFieldContainer}>
                                    <input
                                        {...register('password', {
                                            required: 'Заполните это поле',
                                            minLength: {
                                                value: 3,
                                                message: 'Длина пароля - от 8 до 50 символов'
                                            },
                                            maxLength: {
                                                value: 50,
                                                message: 'Длина пароля - от 8 до 50 символов'
                                            },
                                        })}
                                        maxLength={50}
                                        className={`${styles.input} ${styles.passwordField}`}
                                        placeholder={'Пароль'}
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
                                
                                <button className={styles.submitButton} disabled={!isValid}>Создать аккаунт</button>
                            </form>

                            <div className={styles.underFormInfo}>
                                <span className={styles.underFormText}>Уже есть аккаунт?</span>
                                <span 
                                    className={styles.underFormHref}
                                    onClick={() => {
                                        reset()
                                        setIsActive(false)
                                        setLoginFormActive(true)
                                    }}
                                >
                                    Войти
                                </span>
                            </div>

                        </div>
                    </div>
                </Portal>
            )}
        </>
    )
}


export default RegistrationModal
