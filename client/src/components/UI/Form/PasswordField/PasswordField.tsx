import { FC, useState } from 'react'

import styles from './PasswordField.module.css'

import Input from '../Input/Input'
import ShowPasswordButton from './ShowPasswordButton/ShowPasswordButton'


interface IPasswordFieldProps {
    value: string
    onChange: (inputValue: string) => void
    placeholder?: string
}


const PasswordField: FC<IPasswordFieldProps> = ({
    value,
    onChange,
    placeholder='Пароль'
}) => {

    const [showPassword, setShowPassword] = useState<boolean>(false)

    return (
        <div className={styles.passwordFieldContainer}>

            <Input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                type={showPassword ? 'text' : 'password'}
                style={{marginBottom: 0}}
            />

            <ShowPasswordButton
                showPassword={showPassword}
                setShowPassword={setShowPassword}
            />
        </div>
    )
}


export default PasswordField
