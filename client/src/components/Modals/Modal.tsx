import { FC } from "react";

import styles from './Modal.module.css'

import Portal from "./Portal";


interface IModalProps {
    isActive: boolean
    setIsActive: (value: boolean) => void
    children: React.ReactNode
}


const Modal: FC<IModalProps> = ({
    isActive,
    setIsActive,
    children,
}) => {
    return (
        <>
            {isActive && (
                <Portal>
                    <div className={styles.overlay} onClick={() => setIsActive(false)}>
                        <div className={styles.modalBody} onClick={e => e.stopPropagation()}>

                            {children}

                        </div>
                    </div>
                </Portal>
            )}
        </>
    )   
}


export default Modal
