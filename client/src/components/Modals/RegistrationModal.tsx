import { Dispatch, FC, SetStateAction } from "react";
import Portal from "../Portal";
import styles from './Modal.module.css'
import { SubmitHandler, useForm } from "react-hook-form";


type Props = {
    isActive: boolean,
    setIsActive: Dispatch<SetStateAction<boolean>>,
    setLoginFormActive: Dispatch<SetStateAction<boolean>>,
}

interface IRegistrationFields {
    username: string
    email: string
    phoneNumber: string
    password: string
    confirmPassword: string
}

const RegistrationModal: FC<Props> = ({isActive, setIsActive, setLoginFormActive}) => {
    const {register, handleSubmit, reset, watch,formState: {isValid, errors}} = useForm<IRegistrationFields>({
        mode: "onChange"
    })

    const onSubmit: SubmitHandler<IRegistrationFields> = (data) => {
        reset()
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
                                            message: 'Длина имени пользователя - от 3 до 20 символов'
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: 'Длина имени пользователя - от 3 до 20 символов'
                                        },
                                        
                                    })}
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

                                <span className={styles.errorMessage}>{errors.phoneNumber && <>{errors.phoneNumber.message}</>}</span>

                                <input
                                    {...register('phoneNumber', {
                                        required: 'Заполните это поле',
                                        minLength: {
                                            value: 3,
                                            message: 'Длина имени пользователя - от 3 до 20 символов'
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: 'Длина имени пользователя - от 3 до 20 символов'
                                        },
                                    })}
                                    className={styles.input}
                                    placeholder={'Номер телефона'}
                                    type="tel"
                                    autoComplete="off"
                                />


                                <span className={styles.errorMessage}>{errors.password && <>{errors.password.message}</>}</span>  

                                <input
                                    {...register('password', {
                                        required: 'Заполните это поле',
                                        minLength: {
                                            value: 3,
                                            message: 'Длина имени пользователя - от 3 до 20 символов'
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: 'Длина имени пользователя - от 3 до 20 символов'
                                        },
                                    })}
                                    className={styles.input}
                                    placeholder={'Пароль'}
                                    type="password"
                                    autoComplete="off"
                                />

                                <span className={styles.errorMessage}>{errors.confirmPassword && <>{errors.confirmPassword.message}</>}</span>

                                <input
                                    {...register('confirmPassword', {
                                        required: 'Заполните это поле',
                                        minLength: {
                                            value: 3,
                                            message: 'Длина имени пользователя - от 3 до 20 символов'
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: 'Длина имени пользователя - от 3 до 20 символов'
                                        },
                                        validate: (val: string) => {
                                            if (watch('password') != val) {
                                              return "Пароли должны совпадать";
                                            }
                                        },
                                    })}
                                    className={styles.input}
                                    placeholder={'Подтвердите пароль'}
                                    type="password"
                                    autoComplete="off"
                                />
                                
                                <button className={styles.submitButton} disabled={!isValid}>Войти</button>
                            </form>

                            <div className={styles.underFormInfo}>
                                <span className={styles.underFormText}>Нет аккаунта?</span>
                                <span 
                                    className={styles.underFormHref}
                                    onClick={() => {
                                        reset()
                                        setIsActive(false)
                                        setLoginFormActive(true)
                                    }}
                                >
                                    Зарегистрироваться
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
