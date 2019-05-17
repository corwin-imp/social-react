import * as React from "react";
import * as styles from './Loading.scss';

const Loading = () => {
	return (
		<div className={styles.loading}>
			<div className={styles.inner}>
				<div className={styles.spinner}>
					<div className={styles.bubble1} />
					<div className={styles.bubble2} />
				</div>
			</div>
		</div>
	);
}

export {Loading};
