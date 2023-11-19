
import styles from './HelpBlock.module.css'


const HelpBlock = () => {
    return (
        <div className={styles.helpBlock}>
            <span className={styles.label}>Есть вопросы по лоту?</span>

            <span className={styles.mediaOption}>
                Telegram:<a
                    href="https://t.me/discoboy1337"
                    className={styles.mediaHref}
                >
                    https://t.me/discoboy1337
                </a>
            </span>
            <img
                src="/seller_tg_qr.png"
                alt="qr code"
                className={styles.qrcode}
            />

        </div>
    )
}

export default HelpBlock
