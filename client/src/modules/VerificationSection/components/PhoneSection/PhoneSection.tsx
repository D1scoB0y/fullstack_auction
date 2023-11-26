import { useNavigate } from "react-router-dom"
import Button from "../../../../UI/Button/Button"
import styles from './PhoneSection.module.css'
import { useUserContext } from "../../../../context/UserContext"
import { useSnackbarContext } from "../../../../context/SnackbarContext"
import requestPhoneVerification from "../../api/requestPhoneVerification"


const PhoneSection = () => {
    const navigate = useNavigate()

    const {
        user,
        token,
    } = useUserContext()

    const {
        showSnackbar,
    } = useSnackbarContext()

    const startPhoneVerification = async () => {
        if (!user?.phoneNumber) {
            showSnackbar('fail', 'Ошибка, попробуйте позже')
            return
        }

        const isSuccess = await requestPhoneVerification(token as string)

        if (isSuccess) {
            navigate('/phone-verification')
        } else {
            showSnackbar('fail', 'Слишком частые запросы! Подождите немного')
        }
    }

    return (
        <>
        <span className={styles.optionTitle}>Номер телефона</span>

            <div className={styles.optionStatus}>
                <img
                    className={styles.statusIcon}
                    src={user?.phoneNumberIsVerified ? '/success.png' : '/alert.png'}
                    alt="status icon"
                />

                {user?.phoneNumberIsVerified ? (
                    <span className={styles.greenStatusDescription}>
                        Номер телефона подтвержден
                    </span>
                ) : (
                    <span className={styles.redStatusDescription}>
                        Номер телефона не подтвержден. Подтвердите, чтобы иметь возможность
                        публиковать ставки.
                    </span>
                )}
            </div>
                {!user?.phoneNumberIsVerified && (
                    <>
                        <span className={styles.optionHint}>
                            После нажатия на кнопку вам позвонят. Введите 4 последние цифры
                            номера в диалоговом окне.
                        </span>

                        <Button
                            text="Позвонить"
                            onClick={startPhoneVerification}
                            disabled={!user?.phoneNumber}
                            className={styles.callButton}
                        />
                    </>
                )}
        </>
    )
}

export default PhoneSection
