import { useRef } from 'react'

import styles from './VerificationSection.module.css'
import useUserContext from '@/context/useUserContext'

import { emailVerificationRequest, requestPhoneCall } from '@/services/userServices/userDataVerificationService'

import Button from '@/components/UI/Button/Button'
import Line from '@/components/UI/Line/Line'
import Snackbar from '@/components/UI/Snackbar/Snackbar'
import useModalsStore from '@/stores/modalsStore'


const VerificationSection = () => {
    
    const { user, token } = useUserContext()

    const snackbarRef = useRef(null)

    const { setPhoneVerificationModalActive } = useModalsStore()

    const startEmailVerification = async () => {

        const isSuccess = await emailVerificationRequest(token)

        if (isSuccess) {
            // @ts-ignore
            snackbarRef.current.show(
                'success',
                'Письмо успешно отправлено!'
            )
        } else {
            // @ts-ignore
            snackbarRef.current.show(
                'fail',
                'Ошибка. Попробуйте позже'
            )
        }
    }

    const startPhoneVerification = () => {
        requestPhoneCall(token)
        setPhoneVerificationModalActive(true)
    }

    return (
        <div className={styles.verificationsSection}>


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
                        Электронная почта не подтверждена. 
                        Подтвердите чтобы иметь возможность публиковать ставки.
                    </span>
                )}

            </div>
            
            {!user?.emailIsVerified && (
                <span className={styles.optionHint}>После нажатия на кнопку мы отправим вам письмо.</span>
            )}

            {!user?.emailIsVerified && (
                <Button
                    text='Отправить письмо'
                    onClick={startEmailVerification}
                    style={{marginTop: 24}}
                />
            )}

            <Line />


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
                        Номер телефона не подтвержден. 
                        Подтвердите чтобы иметь возможность публиковать ставки.
                    </span>
                )}

            </div>

            {!user?.phoneNumberIsVerified && (
                <span className={styles.optionHint}>
                    После нажатия на кнопку вам позвонят. 
                    Введите 4 последние цифры номера в диалоговом окне.
                </span>
            )}
            

            {!user?.phoneNumberIsVerified && (
                <Button
                    text='Позвонить'
                    onClick={startPhoneVerification}
                    disabled={!user?.phoneNumber}
                    style={{marginTop: 24}}
                />
            )}

            <Snackbar ref={snackbarRef}/>

        </div>
    )
}


export default VerificationSection
