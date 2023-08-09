import { FC, useEffect, useState } from 'react'
import { getUser, updateUser } from '../../services/userService'
import styles from './SettingsPage.module.css'
import useAuthStore from '../../stores/authStore'
import useIsAuthenticated from '../../hooks/useIsAuthenticated'
import { checkUsername, checkEmail, checkPhone } from '../../services/userService'
import { IUser } from '../../types/user.interface'
import useSettingsFormHandlers, { IFormData, IFormErrors } from '../../hooks/useSettingsFormHandlers'



const SettingsPage: FC = () => {

    useIsAuthenticated()

    const [user, setUser] = useState<IUser|null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [formIsValid, setFormIsValid] = useState<boolean>(true)
    const [formData, setFormData] = useState<IFormData>({
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
    })
    const [errors, setErrors] = useState<IFormErrors>({
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
    })


    useEffect(() => {
        updateUserState()
    }, [])

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                username: user.username,
                email: user.email,
                phoneNumber: user.phone_number,
            }))
        }
    }, [user])

    useEffect(() => {

        const isErrors = errors.username || errors.email || errors.phoneNumber || errors.password 

        if (isErrors || formData.password.length === 0) {
            setFormIsValid(false)
        } else {
            setFormIsValid(true)
        }
    }, [errors, formData.password])


    const {
        usernameHandler,
        emailHandler,
        phoneNumberHandler,
        passwordHandler
    } = useSettingsFormHandlers(setFormData, setErrors)


    const token = useAuthStore(state => state.token)

    const updateUserState = async () => {

        if (token) {

            const fetchedUser = await getUser(token)

            if (fetchedUser) {
                setUser(fetchedUser)
            }
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        setIsLoading(true)

        let isSubmissionСanceled = false

        if (formData.username !== user?.username && !await checkUsername(formData.username)) {
            setErrors(prev => ({...prev, username: 'Это имя пользователя уже занято'}))
            isSubmissionСanceled = true
        }

        if (formData.email !== user?.email && !await checkEmail(formData.email)) {
            setErrors(prev => ({...prev, email: 'Эта почта уже занята'}))
            isSubmissionСanceled = true
        }

        if (formData.phoneNumber) {

            if (formData.phoneNumber !== user?.phone_number && !await checkPhone(formData.phoneNumber)) {

                setErrors(prev => ({...prev, phoneNumber: 'Этот номер телефона уже занят'}))
                isSubmissionСanceled = true
            }
        }

        
        if (!isSubmissionСanceled) {

            const freshData = {
                username: formData.username,
                email: formData.email,
                phone_number: formData.phoneNumber,
                password: formData.password,
            }

            if (token) {
                const response = await updateUser(freshData, token)

                if (!response) {
                    setErrors(prev => ({...prev, password: 'Неверный пароль'}))
                }
            }
        }

        setFormData(prev => ({...prev, password: ''}))

        updateUserState()

        setIsLoading(false)
    }


    return (
        <>
            <span className={styles.pageTitle}>Настройки аккаунта</span>

            <form className={styles.form} onSubmit={onSubmit} noValidate>


                <span className={styles.inputLabel}>Имя пользователя</span>

                {errors.username && <span className={styles.errorMessage}>{errors.username}</span>}

                <input
                    className={styles.input}
                    name='username'
                    value={formData.username}
                    onChange={(e) => {e.preventDefault(); usernameHandler(e.target.value)}}
                    maxLength={20}
                    type="text"
                />


                <span className={styles.inputLabel}>Электронная почта</span>

                {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}

                <div className={styles.fieldContainer}>

                    <input
                        className={styles.input}
                        name='email'
                        value={formData.email}
                        onChange={(e) => {e.preventDefault(); emailHandler(e.target.value)}}
                        style={{marginBottom: 0}}
                        type="text"
                    />

                    {user?.email_is_verified
                        ? <span className={styles.okSymbol}>✓</span>
                        : <button type='button' className={styles.confirmButton} disabled={!user?.email}>Подтвердить</button>
                    }

                </div>


                <span className={styles.inputLabel}>Номер телефона</span>

                {errors.phoneNumber && <span className={styles.errorMessage}>{errors.phoneNumber}</span>}

                <div className={styles.fieldContainer}>

                    <input
                        className={styles.input}
                        name='phoneNumber'
                        value={formData.phoneNumber || ''}
                        onChange={(e) => {e.preventDefault(); phoneNumberHandler(e.target.value)}}
                        maxLength={14}
                        style={{marginBottom: 0}}
                        placeholder='+79999999999'
                        type="tel"
                    />

                    {user?.phone_number_is_verified
                        ? <span className={styles.okSymbol}>✓</span>
                        : <button type='button' className={styles.confirmButton} disabled={!user?.phone_number}>Подтвердить</button>
                    }

                </div>


                <span className={styles.inputLabel}>Текущий пароль</span>

                {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}

                <div className={styles.passwordFieldContainer}>

                    <input
                        className={`${styles.input} ${styles.passwordField}`}
                        name='password'
                        value={formData.password}
                        onChange={(e) => {e.preventDefault(); passwordHandler(e.target.value)}}
                        maxLength={50}
                        type={showPassword ? 'text' : 'password'}
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
                

                <div className={styles.submitButtonContainer}>
                    <button className={styles.submitButton} disabled={!formIsValid}>Сохранить</button>
                    
                    {isLoading && <div className={styles.loader}></div>} 
                </div>

            </form>
        </>
    )
}


export default SettingsPage
