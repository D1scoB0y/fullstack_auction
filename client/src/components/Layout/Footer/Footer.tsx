import Link from 'next/link'

import styles from './Footer.module.css'


const Footer = () => {
  return (
    <div className={styles.footer}>
        <div className={styles.innerFooter}>

            <Link className={styles.footerSection} href={'/'}>
                Главная
            </Link>

            <span className={styles.copyright}>© 2023</span>

        </div>
    </div>
  )
}

export default Footer
