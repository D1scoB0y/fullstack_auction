import { forwardRef, useState, useImperativeHandle } from 'react'

import clsx from 'clsx'

import styles from './Snackbar.module.css'

import type { TypeSnackbarType } from '../../context/SnackbarContext'


const Snackbar = forwardRef(({}, ref) => {
    const [isActive, setIsActive] = useState<boolean>(false)

    const [type, setType] = useState<TypeSnackbarType>('success')
    const [text, setText] = useState<string>('')

    useImperativeHandle(ref, () => ({
        show(type: TypeSnackbarType, text: string) {
            setType(type)
            setText(text)

            setIsActive(true)

            setTimeout(() => setIsActive(false), 4000)
        },
    }))

    return (
        <div
            className={clsx(
                styles.snackbar,
                isActive && styles.active,
                type === 'success' ? styles.success : styles.fail,
            )}
        >
            <img
                className={styles.statusIcon}
                src={type === 'success' ? '/success.png' : '/alert.png'}
                alt="cross icon"
            />

            <span
                className={clsx(
                    styles.text,
                    type === 'success' ? styles.successText : styles.failText,
                )}
            >
                {text}
            </span>

            <img
                className={styles.crossIcon}
                src="/cancel.png"
                alt="cross icon"
                onClick={() => setIsActive(false)}
            />
        </div>
    )
})

export default Snackbar
