import { useEffect, useState } from "react"
import validateEmailVerificationToken from "./validateEmailVerificationToken"
import { Link, useSearchParams } from "react-router-dom"
import PageSpinner from "../../UI/PageSpinner/PageSpinner"
import PageMetaInfo from "../../components/PageMetaInfo/PageMetaInfo"
import styles from './EmailVerification.module.css'
import Button from "../../UI/Button/Button"


const EmailVerification = () => {
    const [validationInProcess, setValidationInProcess] = useState<boolean>(true)
    const [isTokenValid, setIsTokenValid] = useState<boolean>(false)

    const [ params ] = useSearchParams()
    const token = params.get('token')

    useEffect(() => {
        if (token) {
            (async () => {
                const isTokenValid = await validateEmailVerificationToken(token)
                setIsTokenValid(isTokenValid)
            })()
        } else {
            setIsTokenValid(false)
        }

        setValidationInProcess(false)
    }, [])

    if (validationInProcess) {
        return <PageSpinner />
    }

    return (
        <>
            <PageMetaInfo
                title="Подтверждение электронной почты | FotoJäger`s Auction"
            />

            <div className="content">
                <h2 className={styles.isSuccess}>
                    {isTokenValid ? <>Вы подтвердили почту!</> : <>Ошибкa, попробуйте позже</>}
                </h2>

                <Link
                    to="/"
                    style={{ margin: 'auto', marginTop: 48 }}
                >
                    <Button
                        text="На главную"
                    />
                </Link>
            </div>
        </>
    )
}

export default EmailVerification
