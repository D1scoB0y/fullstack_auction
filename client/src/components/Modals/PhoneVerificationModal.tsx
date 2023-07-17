import { FC, Dispatch, SetStateAction, useState } from 'react'
import Portal from './Portal'
import styles from './Modal.module.css'
import { useForm, SubmitHandler } from 'react-hook-form'
import { IPhoneVerificationData, IUser } from '@/types/user.interface'
import { sendPhoneVerificationCode } from '@/services/userService'
import useStore from '@/stores/useStore'
import useAuthStore from '@/stores/AuthStore'


type Props = {
    isActive: boolean,
    setIsActive: Dispatch<SetStateAction<boolean>>
    setUser: Dispatch<SetStateAction<IUser|null>>
}


const PhoneVerificationModal: FC<Props> = ({isActive, setIsActive, setUser}) => {
    const [showCodeError, setShowCodeError] = useState<boolean>(false)

    const {register, handleSubmit, reset, formState: {isValid, errors}} = useForm<IPhoneVerificationData>({
        mode: "onChange"
    })

    const token = useStore(useAuthStore, state => state.token)

    const onSubmit: SubmitHandler<IPhoneVerificationData> = async (phoneVerificationData) => {
        if (token) {
            const response = await sendPhoneVerificationCode(phoneVerificationData.verification_code, token)

            setShowCodeError(!response)
            if (!response) {
                reset()
            }
            setIsActive(false)
            setUser(prev => {
                if (prev) {
                    return ({
                        ...prev,
                        phone_number_is_verified: true
                    })
                }
                return null
            })
        }
    }

    return (
        <>
            {isActive && (
                <Portal>
                    <div className={styles.overlay} onClick={() => {setIsActive(false); reset()}}>
                        <div className={styles.modalBody} onClick={e => e.stopPropagation()}>
                            <span className={styles.modalTitle}>Подтвердите номер телефона</span>

                            <span className={styles.modalDescription}>
                                Скоро вам поступит звонок. Введите в поле ниже 4 
                                последние цифры номера с которого вам позвонят
                            </span>

                            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                <span className={styles.errorMessage}>
                                        {showCodeError
                                            ? <>Код недействителен</>
                                            : errors.verification_code && <>{errors.verification_code.message}</>
                                        }
                                </span>
                                <input
                                    {...register('verification_code', {
                                        required: 'Заполните это поле',
                                        minLength: {
                                            value: 4,
                                            message: 'Код должен быть 4-x значным',
                                        }
                                    })}
                                    maxLength={4}
                                    type="text"
                                    className={styles.input}
                                />

                                <button className={styles.submitButton} disabled={!isValid}>Подтвердить</button>
                            </form>
                        </div>
                    </div>
                </Portal>
            )}
        </>
    )
}

export default PhoneVerificationModal