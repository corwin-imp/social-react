import React from 'react';
import classNames from 'classnames';
import styles from './Readable.css';

const Readable:React.FC<{className?: string,  children?: React.ReactNode}> =
	({ className, children  }) => {

	return <div className={classNames(styles.readable, className)}>{children}</div>;
}

export default Readable;
