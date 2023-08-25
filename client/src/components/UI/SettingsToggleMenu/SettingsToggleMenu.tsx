import { Dispatch, FC, SetStateAction } from 'react'

import clsx from 'clsx'

import styles from './SettingsToggleMenu.module.css'
import useUserContext from '@/context/useUserContext'




type TypeSettingsToggleMenuState = 'userData' | 'verification'

interface ISettingsToggleMenuProps {
    state: TypeSettingsToggleMenuState
    setState: Dispatch<SetStateAction<TypeSettingsToggleMenuState>>
}

const SettingsToggleMenu: FC<ISettingsToggleMenuProps> = ({
    state,
    setState,
}) => {

    const { user } = useUserContext()

    return (

        <div
            className={styles.toggleMenu}
        >

            <div
                className={
                    clsx(
                        styles.menuSection,
                        (state === 'userData') && styles.activeSection,
                    )
                }
                onClick={() => setState('userData')}
            >
                Личные данные
            </div>


            <div
                className={clsx(
                    styles.menuSection,
                    (state === 'verification') && styles.activeSection
                )}
                onClick={() => setState('verification')}
            >

                <div className={styles.verificationContainer}>

                    Верификация

                    <img
                        className={styles.verificationStatusImage}
                        src={
                            (user?.emailIsVerified && user.phoneNumberIsVerified)
                                ? '/success.png'
                                : '/alert.png'
                        }
                        alt="status icon"    
                    />

                </div>
            </div>
        </div>
    )
}

export default SettingsToggleMenu