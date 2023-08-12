

import styles from './WarningModal.module.css'

import useModalsStore from '@/stores/modalsStore'

import Modal from '../Modal'
import Button from '@/components/UI/Button/Button'


const EmailModal = () => {

    const {
        emailWarningModalActive,
        setEmailWarningModalActive,
    } = useModalsStore()


    return (
        <Modal isActive={emailWarningModalActive} setIsActive={setEmailWarningModalActive}>

            <span className={styles.warningTitle}>Подтверждение почты</span>

            <span className={styles.warningText}>Мы отправили вам на почту ссылку. Пройдите по ней чтобы подтвердить свою электронную почту.</span>

            <Button
                text='Хорошо'
                onClick={() => setEmailWarningModalActive(false)}
                style={{width: 300, height: 48}}
            />

        </Modal>
    )
}


export default EmailModal
