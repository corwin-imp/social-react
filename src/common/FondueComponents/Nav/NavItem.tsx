import React, { Component } from 'react';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { Arrow } from '../FondueAssets/svg';
import styles from './Nav.css';


interface PropsType {
	children?: JSX.Element
	name?: string
	title?: string
	link?: string
	className?: string
	label?: string
	active?: boolean
}

class NavItem extends Component<PropsType,{opened: boolean}> {
	constructor(props: PropsType) {
		super(props);

		this.state = {
			opened: props.active ? true : false,
		};
	}

	toggleAccordion = () => {
		this.setState({ opened: !this.state.opened });
	};

	render() {

		const { opened } = this.state;
		const { children, title, className, link, label } = this.props;


		const x: {to?: string}  | React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> =  {
			to:link,
			onClick:children ? this.toggleAccordion : undefined,
			className:styles.link
		}
		return (
			<li
				className={classNames(styles.navItem, className, {
					[styles.opened]: opened,

				})}
			>
				<button
					{...x}
				>
					{title} {label && <span className={styles.label}>{label}</span>}
					<Arrow className={styles.arrow} />
				</button>
				{children && children}
			</li>
		);
	}
}

export {NavItem};
