import { Link } from 'react-router-dom'

import styles from './Footer.module.css'


const Footer = () => {
  return (
    <footer className={styles.footer}>
        <div className={styles.innerFooter}>

            <Link className={styles.footerSection} to={'/'}>
                Главная
            </Link>

            <span className={styles.copyright}>© 2023</span>

        </div>
    </footer>
  )
}

export default Footer