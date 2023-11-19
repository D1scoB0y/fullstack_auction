import { Dispatch, FC, SetStateAction } from 'react'
import { useGoogleLogin, TokenResponse } from '@react-oauth/google'
import styles from './GoogleButton.module.css'
import { useUserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useSnackbarContext } from '../../context/SnackbarContext'


interface Props {
    setIsLoading: Dispatch<SetStateAction<boolean>>
    setErrors: Dispatch<SetStateAction<any>>
}

const GoogleButton: FC<Props> = ({
    setIsLoading,
    setErrors,
}) => {
    const navigate = useNavigate()
    const { loginWithGoogle } = useUserContext()
    const { showSnackbar } = useSnackbarContext()

    const onGoogleSuccess = async (tokenResponse: TokenResponse) => {
        setIsLoading(true)

        if (tokenResponse.access_token) {
            const isLogined = await loginWithGoogle(tokenResponse.access_token)

            if (isLogined) {
                navigate('/')
            } else {
                setErrors((prev: object) => ({
                    ...prev,
                    afterSubmitError: 'Неверный логин или пароль',
                }))
            }
        }
        setIsLoading(false)
    }

    const googleLogin = useGoogleLogin({
        onSuccess: onGoogleSuccess,
        onError: () => showSnackbar('fail', 'Ошибка, попробуйте позже')
    })

    return (
        <div className={styles.googleButton} onClick={() => googleLogin()}>
            <img src="google.png" alt="google icon" width={20} height={20} />

            <span className={styles.googleText}>Войти с Google</span>
        </div>
    )
}

export default GoogleButton
