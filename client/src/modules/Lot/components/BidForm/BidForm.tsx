import { FC, useEffect, useState } from "react"
import Form from "../../../../UI/Form/Form"
import Input from "../../../../UI/Input/Input"
import Button from "../../../../UI/Button/Button"
import BidFormHints from "../BidFormHints/BidFormHints"
import { useUserContext } from "../../../../context/UserContext"
import placeBid from "../../api/placeBid"
import { useSnackbarContext } from "../../../../context/SnackbarContext"
import nextMinimalBid from "../../helpers/nextMinimalBid"
import formatPrice from "../../../../helpers/priceFormatter"
import { useLotStore } from "../.."
import { Lot } from "../../../../types/auction"
import styles from './BidForm.module.css'


const BidForm: FC<{ lot: Lot }> = ({
    lot,
}) => {
    const [bid, setBid] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [hints, setHints] = useState<string[]>([]) 
    const [isValid, setIsValid] = useState<boolean>(false)

    const {
        user,
        token,
    } = useUserContext()

    const {
        showSnackbar,
    } = useSnackbarContext()

    const {
        updateCurrentBid,
    } = useLotStore()

    useEffect(() => {
        if (!user) {
            setHints(['Авторизуйтесь для публикации ставок'])
            return
        }

        if (user.userId === lot.sellerId) {
            setHints(['Вы владелец этого лота'])
            return
        }

        if (!user.emailIsVerified) {
            setHints(prev => ([
                ...prev,
                'Подтвердите почту'
            ]))
        }

        if (!user.phoneNumberIsVerified) {
            setHints(prev => ([
                ...prev,
                'Подтвердите номер телефона'
            ]))
        }
    }, [user])

    const handleBid = (bid: string) => {
        if (bid) {
            if (!'1234567890'.includes(bid[bid.length - 1])) {
                return
            }

            if (bid === '0') {
                return
            }
        }

        setBid(bid)

        if (Number(bid) < nextMinimalBid(lot.currentBid)) {
            setIsValid(false)
            return
        }

        setIsValid(true)
    }

    const handleSumbmit = async () => {
        if (!user || !token || !user.emailIsVerified || !user.phoneNumberIsVerified || !token) {
            showSnackbar('fail', 'Ошибка, попробуйте позже.')
            return
        }

        const isPlaced = await placeBid(lot.lotId, bid, token)

        if (isPlaced) {
            setBid('')
            setIsValid(false)
            updateCurrentBid({
                bidderUsername: user.username,
                secondsFromPlacing: 0,
                value: Number(bid),
            })
        } else {
            showSnackbar('fail', 'Ошибка, попробуйте позже.')
        }
    }

    return (
        <Form
            onSubmit={handleSumbmit}
            setIsLoading={setIsLoading}
            className={styles.form}
        >
            <div className={styles.bidInputContainer}>
                <Input
                    value={bid}
                    placeholder={`₽ ${formatPrice(nextMinimalBid(lot.currentBid))} или больше`}
                    onChange={handleBid}
                    className={styles.input}
                />
                <Button
                    text="Предложить ставку"
                    disabled={!isValid || !!hints.length}
                    isLoading={isLoading}
                    className={styles.button}
                />
            </div>
            <BidFormHints hints={hints} />
        </Form>
    )
}

export default BidForm
