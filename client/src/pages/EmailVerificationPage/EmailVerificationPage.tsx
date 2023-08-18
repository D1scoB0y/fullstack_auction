import { useState, useEffect } from 'react'

import { Helmet } from 'react-helmet-async'

import styles from './EmailVerificationPage.module.css'

import { useSearchParams, useNavigate } from 'react-router-dom'

import Loader from '@/components/UI/Loader/Loader'
import { isEmailTokenValid } from '@/services/userServices/userDataVerificationService'
import Button from '@/components/UI/Button/Button'

const EmailVerificationPage = () => {

    const [validationInProcess, setValidationInProcess] = useState<boolean>(true)
    const [isTokenValid, setIsTokenValid] = useState<boolean>(false)

    const [params] = useSearchParams()
    const token = params.get('token')

    const navigate = useNavigate()

    useEffect(() => {
        
        if (token) {
            (async () => {
                const isTokenValid = await isEmailTokenValid(token)
                setIsTokenValid(isTokenValid)
            })()
        } else {
            setIsTokenValid(false)
        }

        setValidationInProcess(false)
    }, [])


    if (validationInProcess) {
        return (
            <div className={styles.loaderContainer}>
                <Loader
                    width={100}
                    height={100}  
                />
            </div>
        )
    }

    return (
        <>
            <Helmet>
                <title>Подтверждение электронной почты | FotoJäger`s Auctions</title>
            </Helmet>

            <h2 className={styles.isSuccess}>
                {isTokenValid
                    ? <>Вы подтвердили почту!</>
                    : <>Ошибка. Попробуйте позже</>
                }
            </h2>

            <Button
                text='На главную'
                style={{margin: 'auto', marginTop: 48}}
                onClick={() => navigate('/')}
            />
        </>
    )

}


export default EmailVerificationPage
