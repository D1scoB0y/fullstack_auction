import { FC, memo } from "react"
import styles from './BidFormHints.module.css'


const BidFormHints: FC<{ hints: string[] }> = ({
    hints,
}) => {
    if (hints.length) {
        return (
            <div className={styles.hintContainer}>
                {hints.map(hint => (
                    <span key={hint} className={styles.hint}>* {hint}</span>
                ))}
            </div>
        )
    }
}

export default memo(BidFormHints)
