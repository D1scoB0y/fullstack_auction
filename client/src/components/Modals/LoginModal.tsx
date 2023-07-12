import { Dispatch, FC, SetStateAction, useState } from "react";
import Portal from "../Portal";
import styles from './Modal.module.css'


type Props = {
    isActive: boolean,
    setIsActive: Dispatch<SetStateAction<boolean>>,
    setRegistrationFormActive: Dispatch<SetStateAction<boolean>>,
}

const LoginModal: FC<Props> = ({isActive, setIsActive, setRegistrationFormActive}) => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    return (
        <>
            {isActive && (
                <Portal>
                    <div className={styles.overlay} onClick={() => setIsActive(false)}>
                        <div className={styles.modalBody} onClick={e => e.stopPropagation()}>
                            <span className={styles.modalTitle}>Вход</span>

                            <input
                                type="text"
                                className={styles.input}
                                placeholder={'Электронная почта'}
                                onChange={e => {
                                    setFormData(prev => ({
                                        ...prev,
                                        email: e.target.value,
                                    }))
                                }}
                            />

                            <input
                                type="text"
                                className={styles.input}
                                placeholder={'Пароль'}
                                onChange={e => {
                                    setFormData(prev => ({
                                        ...prev,
                                        password: e.target.value,
                                    }))
                                }}
                            />
                            
                            <input
                                type="submit"
                                className={styles.submitButton}
                                value={'Войти'}
                                onClick={() => {

                                }}
                            />

                            <div className={styles.underFormInfo}>
                                <span className={styles.underFormText}>Нет аккаунта?</span>
                                <span 
                                    className={styles.underFormHref}
                                    onClick={() => {
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
