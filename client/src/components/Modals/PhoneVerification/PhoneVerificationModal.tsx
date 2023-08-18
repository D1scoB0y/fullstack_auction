import React, { useEffect, useState } from "react"

import styles from './PhoneVerificationModal.module.css'

import useModalsStore from "@/stores/modalsStore"

import { isPhoneCodeValid } from "@/services/userServices/userDataVerificationService"

import Modal from "../Modal"
import Input from "@/components/UI/Form/Input/Input"
import useUserContext from "@/context/useUserContext"
import Button from "@/components/UI/Button/Button"
import ErrorMessage from "@/components/UI/Form/ErrorMessage/ErrorMessage"
import useInput from "@/hooks/useInput"


const PhoneVerificationModal = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [codeError, setCodeError] = useState<string>('')
    const [isValid, setIsValid] = useState<boolean>(false)

    const { token, updateUserState } = useUserContext()

    const {
        phoneVerificationModalActive,
        setPhoneVerificationModalActive,
    } = useModalsStore()

    const code = useInput('', {required: true, minLength: 4, onlyNumbers: true})

    useEffect(() => {
        setIsValid(code.isValid && !codeError)
    }, [code.isValid, codeError])

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setIsLoading(true)

        const isCodeValid = await isPhoneCodeValid(token, code.value)

        if (isCodeValid) {
            setPhoneVerificationModalActive(false)
            updateUserState()
        } else {
            setCodeError('Код недействителен')
        }

        setIsLoading(false)
    }


    return (
        <Modal
            title="Подтверждение номера"
            isActive={phoneVerificationModalActive}
            setIsActive={setPhoneVerificationModalActive}
            onClose={code.clearField}
        >   
            <span className={styles.modalText}>
                Скоро вам позвонят. Введите 4 последние
                цифры номера с которого поступит звонок.
            </span>

            <form onSubmit={onSubmit} noValidate>

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
                    style={{marginBottom: 0}}
                />
                
                <Button
                    text='Подтвердить'
                    isLoading={isLoading}
                    disabled={!isValid}
                    style={{width: 300, marginTop: 24}}
                />

            </form>
        </Modal>
    )
}


export default PhoneVerificationModal
