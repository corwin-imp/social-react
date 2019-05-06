import React from 'react';
import styles from './Loading.css';
import logo from '../../FondueAssets/images/logo.svg';
import AppearAfter from '../../FondueComponents/AppearAfter';

function Loading() {
	return (
		<div className={styles.loading}>
			<img src={logo} alt="Loading Logo" />
		</div>
	);
}

export default Loading;
