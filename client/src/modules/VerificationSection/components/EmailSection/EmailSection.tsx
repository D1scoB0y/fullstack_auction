import { useState } from "react"
import { useUserContext } from "../../../../context/UserContext"
import { useSnackbarContext } from "../../../../context/SnackbarContext"
import requestEmailVerification from "../../api/requestEmailVerification"
import Button from "../../../../UI/Button/Button"
import styles from './EmailSection.module.css'
import Timer from "../../../../components/Timer/Timer"


const EmailSection = () => {
    const [emailTimer, setEmailTimer] = useState<number>(0)

    const {
        user,
        token,
    } = useUserContext()

    const {
        showSnackbar,
    } = useSnackbarContext()

    const sendEmailVerificationMessage = async () => {
        const isSuccess = await requestEmailVerification(token as string)

        if (isSuccess) {
            setEmailTimer(60)
            showSnackbar('success', 'Письмо успешно отправлено!')
        } else {
            showSnackbar('fail', 'Ошибка, попробуйте позже')
        }
    }

    return (
        <>
            <span className={styles.optionTitle}>Электронная почта</span>

            <div className={styles.optionStatus}>
                <img
                    className={styles.statusIcon}
                    src={user?.emailIsVerified ? '/success.png' : '/alert.png'}
                    alt="status icon"
                />

                {user?.emailIsVerified ? (
                    <span className={styles.greenStatusDescription}>
                        Электронная почта подтверждена
                    </span>
                ) : (
                    <span className={styles.redStatusDescription}>
                        Электронная почта не подтверждена. Подтвердите, чтобы иметь возможность
                        публиковать ставки.
                    </span>
                )}
            </div>

            {!user?.emailIsVerified && (
                <>
                    {emailTimer ? (
                        <div className={styles.timerContainer}>
                            <span className={styles.callAgain}>Отправить еще раз</span>
                            <Timer
                                timer={emailTimer}
                                setTimer={setEmailTimer}
                                className={styles.timer}
                            />
                        </div>
                    ) : (
                        <>
                            <span className={styles.optionHint}>
                                После нажатия на кнопку мы отправим вам письмо.
                            </span>
                            <Button
                                text="Отправить письмо"
                                onClick={sendEmailVerificationMessage}
                                className={styles.sendMessageButton}
                            />
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default EmailSection
