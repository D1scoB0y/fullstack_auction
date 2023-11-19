import React, { FC, useState } from 'react'

import styles from './PasswordField.module.css'

import Input from '../Input/Input'


interface Props {
    value: string
    onChange: (inputValue: string) => void
    placeholder?: string
    style?: React.CSSProperties
}

const PasswordField: FC<Props> = ({
    value,
    onChange,
    placeholder = 'Пароль',
    style,
}) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    return (
        <div className={styles.passwordFieldContainer} style={{...style}}>
            <Input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                type={showPassword ? 'text' : 'password'}
                style={{ marginBottom: 0 }}
            />

            <img
                className={styles.showPasswordButton}
                src={showPassword ? '/hide.png' : '/view.png'}
                alt="eye icon"
                onClick={() => {
                    setShowPassword(prev => !prev)
                }}
            />
        </div>
    )
}

export default PasswordField
