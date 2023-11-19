import EmailSection from "../components/EmailSection/EmailSection"
import Line from "../../../UI/Line/Line"
import styles from './VerificationSection.module.css'
import PhoneSection from "../components/PhoneSection/PhoneSection"


const VerificationSection = () => {
    return (
        <div
            className={styles.options}
        >
            <EmailSection />
            <Line />
            <PhoneSection />
        </div>
    )
}

export { VerificationSection }
