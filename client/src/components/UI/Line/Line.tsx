import { FC } from 'react'

import styles from './Line.module.css'


const Line: FC<{style?: React.CSSProperties}> = () => {
	return (
		<div className={styles.line}></div>
	)
}


export default Line
