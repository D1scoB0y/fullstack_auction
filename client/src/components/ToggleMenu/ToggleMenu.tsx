import { Dispatch, FC, SetStateAction } from 'react'
import clsx from 'clsx'
import styles from './ToggleMenu.module.css'


interface Props {
    options: [string, string]
    toggled: boolean
    setToggled: Dispatch<SetStateAction<boolean>>
}

const ToggleMenu: FC<Props> = ({
    options,
    toggled,
    setToggled,
}) => {
    return (
        <div className={styles.toggleMenu}>
            <div
                className={clsx(styles.menuSection, !toggled && styles.activeSection)}
                onClick={() => setToggled(false)}
            >
                {options[0]}
            </div>

            <div
                className={clsx(styles.menuSection, toggled && styles.activeSection)}
                onClick={() => setToggled(true)}
            >
                {options[1]}
            </div>
        </div>
    )
}

export default ToggleMenu
