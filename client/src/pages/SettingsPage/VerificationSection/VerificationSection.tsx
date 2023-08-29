import { useRef, useState } from 'react'

import clsx from 'clsx'

import styles from './VerificationSection.module.css'
import useUserContext from '@/context/useUserContext'

import { emailVerificationRequest, requestPhoneCall, isPhoneCodeValid } from '@/services/userServices/userDataVerificationService'

import Button from '@/components/UI/Button/Button'
import Line from '@/components/UI/Line/Line'
import Snackbar from '@/components/UI/Snackbar/Snackbar'
import Input from '@/components/UI/Form/Input/Input'
import useInput from '@/hooks/useInput'
import ErrorMessage from '@/components/UI/Form/ErrorMessage/ErrorMessage'
import Timer from '@/components/UI/Timer/Timer'
import useFormValid from '@/hooks/useFormValid'


const VerificationSection = () => {
    
    const [phoneInProcess, setPhoneInProcess] = useState<boolean>(false)
    const [codeError, setCodeError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [timer, setTimer] = useState<number>(0)

    const { user, token, updateUserState } = useUserContext()

    const snackbarRef = useRef(null)

    const code = useInput('', {required: true, minLength: 4, onlyNumbers: true})

    const isValid = useFormValid(codeError, code)

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

    const startPhoneVerification = async () => {

        const isSuccess = await requestPhoneCall(token)

        if (isSuccess) {
            setTimer(120)
            setPhoneInProcess(true)
        } else {
            // @ts-ignore
            snackbarRef.current.show(
                'fail',
                'Слишком частые запросы! Подождите немного'
            )
        }
    }

    const onPhoneCodeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setIsLoading(true)

        const isCodeValid = await isPhoneCodeValid(token, code.value)

        if (isCodeValid) {
            // @ts-ignore
            snackbarRef.current.show(
                'success',
                'Номер телефона подтвержден!'
            )
            setPhoneInProcess(false)
            updateUserState()
        } else {
            setCodeError('Код недействителен')
        }

        setIsLoading(false)
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
            
            {phoneInProcess ? (
                <form onSubmit={onPhoneCodeSubmit} noValidate>

                    <ErrorMessage errorText={code.error || codeError} />

                    <Input
                        value={code.value}
                        onChange={
                            (value: string) => {
                                setCodeError('')
                                code.onChange(value)
                            }
                        }
                        placeholder='Код'
                        maxLength={4}
                    />

                    <Button
                        text='Подтвердить'
                        isLoading={isLoading}
                        disabled={!isValid}
                        style={{marginTop: 24}}
                    />

                    <div className={styles.timerContainer}>
                        <span
                            className={clsx(styles.callAgain, !timer && styles.callAgainActive)}
                            onClick={() => {
                                if (!timer) {
                                    setTimer(120)
                                    requestPhoneCall(token)
                                }
                            }}
                        >
                            Позвонить еще раз
                        </span>

                        <Timer
                            timer={timer}
                            setTimer={setTimer}
                            className={styles.timer}
                        />
                    </div>
                    
                </form>
            ) : (
                <>
                    {!user?.phoneNumberIsVerified && (
                        <>
                            <span className={styles.optionHint}>
                                После нажатия на кнопку вам позвонят. 
                                Введите 4 последние цифры номера в диалоговом окне.
                            </span>
                        
                            <Button
                                text='Позвонить'
                                onClick={startPhoneVerification}
                                disabled={!user?.phoneNumber}
                                style={{marginTop: 24}}
                            />
                        </>
                    )}
                </>
            )}

            <Snackbar ref={snackbarRef}/>

        </div>
    )
}


export default VerificationSection
