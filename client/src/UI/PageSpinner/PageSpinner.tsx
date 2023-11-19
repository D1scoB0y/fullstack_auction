import styles from './PageSpinner.module.css'

import Spinner from '../Spinner/Spinner'


const PageSpinner = () => 
    <div className={styles.pageSpinner}>
        <Spinner size={100} borderWidth={3} />
    </div>

export default PageSpinner
