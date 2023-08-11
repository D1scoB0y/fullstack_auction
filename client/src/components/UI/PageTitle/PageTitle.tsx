import { FC, memo } from "react"

import styles from './PageTitle.module.css'


interface IPageTitleProps {
    text: string
    className?: string
}


const PageTitle: FC<IPageTitleProps> = memo(({
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
})


export default PageTitle
