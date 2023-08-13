import { FC, Dispatch, SetStateAction, memo } from "react"

import styles from './ShowPasswordButton.module.css'


interface IShowPasswordButtonProps {
    showPassword: boolean
    setShowPassword: Dispatch<SetStateAction<boolean>>
}


const ShowPasswordButton: FC<IShowPasswordButtonProps> = ({
    showPassword,
    setShowPassword,
}) => {
  return (
    <img
        className={styles.showPasswordButton}
        src={showPassword ? '/hide.png' : '/view.png'}
        alt="eye icon"
        onClick={() => {
            setShowPassword(prev => !prev)
        }}
    />
  )
}


export default memo(ShowPasswordButton)
