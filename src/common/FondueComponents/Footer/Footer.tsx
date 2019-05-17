import React from 'react';
import classNames from 'classnames';
import { GitHub } from '../FondueAssets/svg';
import { ContentPusher } from '../Layout';
import {Props} from './types'
import * as styles from './Footer.css';
const Footer:React.FC<Props> = ({ className }) => {

	return (
		<footer className={classNames(styles.footer, className)}>
			<ContentPusher>
				<a href="https://github.com/luangjokaj/react-fondue" target="_blank">
					<GitHub />
				</a>
			</ContentPusher>
		</footer>
	);
}

export {Footer};
