import { FC, memo } from 'react'
import clsx from 'clsx'


import styles from './PageTitle.module.css'


interface Props {
    text: string
    className?: string
}

const PageTitle: FC<Props> = ({
    text,
    className,
}) => {
    return (
        <span
            className={clsx(styles.pageTitle, className)}
        >
            {text}
        </span>
    )
}

export default memo(PageTitle)
