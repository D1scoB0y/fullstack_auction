import React, { useState } from "react"

import styles from './PhoneVerificationModal.module.css'

import useModalsStore from "@/stores/modalsStore"

import Modal from "../Modal"
import Input from "@/components/UI/Form/Input/Input"
import ModalLoaderOverlay from "@/components/UI/ModalLoaderOverlay/ModalLoaderOverlay"
import { isPhoneCodeValid } from "@/services/userServices/userDataVerificationService"
import useUserContext from "@/context/useUserContext"
import Button from "@/components/UI/Button/Button"


const PhoneVerificationModal = () => {

    const [code, setCode] = useState<string>('')
    const [codeError, setCodeError] = useState<string>('')

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { token, updateUserState } = useUserContext()

    const {
        phoneVerificationModalActive,
        setPhoneVerificationModalActive,
    } = useModalsStore()

    const codeHandler = (code: string) => {

        setCode(code)

        if (code.length === 0) {
            setCodeError('Заполните это поле')
            return
        }

        const avalibleSymbols = '1234567890'

        for (const symbol of code) {
            if (avalibleSymbols.indexOf(symbol) === -1) {
                setCodeError('Только цифры')
                return
            }
        }

        if (code.length < 4) {
            setCodeError('Длина кода - 4 цифры')
            return
        }

        setCodeError('')
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setIsLoading(true)

        const isCodeValid = await isPhoneCodeValid(token, code)

        if (isCodeValid) {
            setPhoneVerificationModalActive(false)
            updateUserState()
        } else {
            setCodeError('Код недействителен')
        }

        setIsLoading(false)
    }


    return (
        <Modal isActive={phoneVerificationModalActive} setIsActive={setPhoneVerificationModalActive}>

            <span className={styles.modalTitle}>Подтверждение номера</span>
            
            <span className={styles.modalText}>
                Скоро вам позвонят. Введите 4 последние
                цифры номера с которого поступит звонок.
            </span>

            <form onSubmit={onSubmit} noValidate>

                <span className={styles.errorMessage}>{codeError}</span>

                <Input
                    value={code}
                    onChange={(e) => codeHandler(e.target.value)}
                    placeholder='Код'
                    maxLength={4}
                    style={{marginBottom: 0}}
                />
                
                <Button
                    text='Подтвердить'
                    disabled={!!codeError}
                    style={{width: 300, marginTop: 24}}
                />

            </form>

            {isLoading && <ModalLoaderOverlay />}

        </Modal>
    )
}


export default PhoneVerificationModal
