import { FC } from 'react'

import styles from './Line.module.css'


const Line: FC<{style?: React.CSSProperties}> = ({
	style,
}) => {
	return (
		<div
			className={styles.line}
			style={{...style}}
		></div>
	)
}


export default Line
