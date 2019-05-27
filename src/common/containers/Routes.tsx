import React, { Fragment } from 'react';
import universal from 'react-universal-component';
import GoogleTagManager from '../FondueComponents/GoogleTagManager';
import {Head} from '../FondueComponents/Head';
import Nav from '../FondueComponents/Nav';
import {Footer} from '../FondueComponents/Footer';
import Loadable from "react-loadable";
import { hot } from "react-hot-loader";
import { Route, Switch, RouteComponentProps } from 'react-router';
import { RedirectWithStatus } from '../FondueComponents/RedirectStatus';
import { Loading } from '../FondueComponents/Layout';
import '../FondueComponents/FondueAssets/css/styles.css';

const isProd = process.env.NODE_ENV === 'production';

interface interfaceProp extends RouteComponentProps<{
	todoListId: string
}> {}

// @ts-ignore
const UniversalComponent: React.FC<{page?: string} & RouteComponentProps<{}>> = (props) =>  Loadable({
	loader: () => {
		return import(`../Views/${props.page}`)
	},
	loading: Loading,
	modules: [`../Views/${props.page}`],

});
const AsyncHomePage = Loadable({
	loader: () => import("../Views/Home"),
	loading: Loading,
	modules: ['../Views/Home'],

});
const Routes = (props:any) => {

	const {lang} = props

	return (
		<Fragment>
			{isProd ? <GoogleTagManager gtmId="GTM-WFTXGC8" /> : ''}
			<Head />
			<Nav lang={lang} />
			<Switch>
				<Route
					exact
					path="/en"
					component={AsyncHomePage}
				/>

				<Route
					exact
					path="/:lang/about"
					render={(routeProps: interfaceProp) => <UniversalComponent page="About" {...routeProps} />}
				/>
				<Route
					exact
					path="/:lang/chats"
					render={(routeProps: interfaceProp) => <UniversalComponent page="Chats" {...routeProps} />}
				/>
				<RedirectWithStatus status={301} exact from="/" to={`/${lang}`} />
				<Route render={(routeProps: interfaceProp) => <UniversalComponent page="NotFound" {...routeProps} />} />
			</Switch>
			<Footer />
		</Fragment>
	);
}

export default hot(module)(Routes);
