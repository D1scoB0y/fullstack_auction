import { FC, memo } from "react"

import styles from './PageTitle.module.css'


interface IPageTitleProps {
    text: string
    className?: string
}


const PageTitle: FC<IPageTitleProps> = ({
    text,
    className,
}) => {
    return (
        <span
            className={`${styles.pageTitle} ${className}`}
        >
            {text}
        </span>
    )
}


export default memo(PageTitle)
