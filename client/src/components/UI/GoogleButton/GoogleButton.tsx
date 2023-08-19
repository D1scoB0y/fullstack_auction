import { Dispatch, FC, SetStateAction } from "react";

import { useGoogleLogin, TokenResponse } from "@react-oauth/google";

import styles from './GoogleButton.module.css'

import useUserContext from "@/context/useUserContext";
import useModalsStore from "@/stores/modalsStore";


interface IGoogleButtonProps {
	setIsLoading: Dispatch<SetStateAction<boolean>>
	setAfterSubmitError: (value: string) => void
}


const GoogleButton: FC<IGoogleButtonProps> = ({
	setIsLoading,
	setAfterSubmitError,
}) => {

	const {
		loginWithGoogle,
	} = useUserContext()

	const {
		setLoginModalActive,
		setRegistrationModalActive,
	} = useModalsStore()


	const onGoogleSuccess = async (tokenResponse: TokenResponse) => {

        setIsLoading(true)

        if (tokenResponse.access_token) {

            const isLogined = await loginWithGoogle(tokenResponse.access_token)

            if (isLogined) {
                setLoginModalActive(false)
				setRegistrationModalActive(false)
            } else {
                setAfterSubmitError('Неверный логин или пароль')
            }
        }

        setIsLoading(false)
    }

	const googleLogin = useGoogleLogin({		
		onSuccess: onGoogleSuccess,
		onError: () => setAfterSubmitError('Ошибка. Попробуйте позже')
	})

	return (
		<div
			className={styles.googleButton}
			onClick={() => googleLogin()}
		>

			<img
				src="google.png"
				alt="google icon"
				width={20}
				height={20}
			/>

			<span className={styles.googleText}>Войти с Google</span>

		</div>
	)
}


export default GoogleButton
