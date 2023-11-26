import { Link } from 'react-router-dom'
import styles from './Footer.module.css'


const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.innerFooter}>
                <div className={styles.footerSections}>
                    <Link className={styles.footerSection} to={'/'}>
                        Главная
                    </Link>

                    <Link className={styles.footerSection} to={'/how-it-works'}>
                        Как это работает?
                    </Link>
                </div>
                <span className={styles.copyright}>© 2023</span>
            </div>
        </footer>
    )
}

export default Footer
