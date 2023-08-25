import { FC, useEffect } from "react";

import styles from './Modal.module.css'

import Portal from "./Portal";


interface IModalProps {
    title: string
    isActive: boolean
    setIsActive: (value: boolean) => void
    onClose?: () => void
    children: React.ReactNode
}


const Modal: FC<IModalProps> = ({
    title,
    isActive,
    setIsActive,
    onClose,
    children,
}) => {

    useEffect(() => {
        if (!isActive && onClose) {
            onClose()
        }
    }, [isActive])

    return (
        <>
            {isActive && (
                <Portal>
                    <div className={styles.overlay} onClick={() => setIsActive(false)}>
                        <div className={styles.modalBody} onClick={e => e.stopPropagation()}>
                            
                            <span className={styles.modalTitle}>{title}</span>

                            {children}
                            
                        </div>
                    </div>
                </Portal>
            )}
        </>
    )   
}


export default Modal
