import { FC } from "react"

import styles from './ErrorBox.module.css'
import Error from "../Error/Error"


interface Props {
    errors: object
}

const ErrorBox: FC<Props> = ({
    errors,
}) => {
    return (
        <div className={styles.errorBox}>
            {Object.keys(errors).map(key => (
                errors[key as keyof object] && (
                    <Error text={errors[key as keyof object]} key={key} />
                )        
            ))}
        </div>
    )
}

export default ErrorBox
