import { Dispatch, FC, SetStateAction, useState } from "react";
import Portal from "./Portal";
import styles from './Modal.module.css'
import useAuthStore from "@/store/AuthStore";
import { useForm, SubmitHandler } from "react-hook-form";
import { ILoginData } from "@/types/user.interface";
import Image from "next/image";


type Props = {
    isActive: boolean,
    setIsActive: Dispatch<SetStateAction<boolean>>,
    setRegistrationFormActive: Dispatch<SetStateAction<boolean>>,
}

const LoginModal: FC<Props> = ({isActive, setIsActive, setRegistrationFormActive}) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [wrongCredentials, setWrongCredentials] = useState<string|null>(null)

    const {register, handleSubmit, reset, formState: {isValid, errors}} = useForm<ILoginData>({
        mode: "onChange"
    })

    const login = useAuthStore(state => state.login)

    const onSubmit: SubmitHandler<ILoginData> = async (loginData) => {
        
        const response = await login(loginData)
        if (response === null) {
            setWrongCredentials('Неверный логин или пароль')
            reset({password: ''})
        } else {
            setWrongCredentials(null)
            reset()
            setIsActive(false)
        }
    }

    return (
        <>
            {isActive && (
                <Portal>
                    <div className={styles.overlay} onClick={() => setIsActive(false)}>
                        <div className={styles.modalBody} onClick={e => e.stopPropagation()}>
                            <span className={styles.modalTitle}>Вход</span>

                                <form onSubmit={handleSubmit(onSubmit)} noValidate>

                                    <span
                                        className={styles.errorMessage}
                                    >
                                        {wrongCredentials ? (
                                        <>{wrongCredentials}</>
                                        ) : (errors.email && (
                                            <>{errors.email.message}</>
                                        ))}
                                    </span>
                                    <input
                                        {...register('email', {
                                            required: 'Заполните это поле',
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

                                    <button className={styles.submitButton} disabled={!isValid}>Войти</button>
                                </form>
                                
                                <div className={styles.underFormInfo}>
                                    <span className={styles.underFormText}>Нет аккаунта?</span>
                                    <span 
                                        className={styles.underFormHref}
                                        onClick={() => {
                                            reset()
                                            setIsActive(false)
                                            setRegistrationFormActive(true)
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


export default LoginModal
