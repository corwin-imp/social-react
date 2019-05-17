import React, { Fragment } from 'react';
import universal from 'react-universal-component';
import GoogleTagManager from '../FondueComponents/GoogleTagManager';
import {Head} from '../FondueComponents/Head';
import Nav from '../FondueComponents/Nav';
import {Footer} from '../FondueComponents/Footer';
import { Route, Switch, RouteComponentProps } from 'react-router';
import { RedirectWithStatus } from '../FondueComponents/RedirectStatus';
import { Loading } from '../FondueComponents/Layout';
import '../FondueComponents/FondueAssets/css/styles.css';

const isProd = process.env.NODE_ENV === 'production';

interface interfaceProp extends RouteComponentProps<{
	todoListId: string
}> {}

const UniversalComponent: React.FC<{page: string} & RouteComponentProps<{}>> = universal(props => {

	return import(`../Views/${props.page}`)
}, {

	loading: () => {

	    return <Loading />
    },
	ignoreBabelRename: true,
});

const Routes = ({  lang }:{lang: string}) => (
	<Fragment>
		{isProd ? <GoogleTagManager gtmId="GTM-WFTXGC8" /> : ''}
		<Head />
		<Nav lang={lang} />
		<Switch>
			<Route
				exact
				path="/:lang"
				render={(routeProps: interfaceProp) => <UniversalComponent page="Home" {...routeProps} />}
			/>
			<Route
				exact
				path="/:lang/about"
				render={(routeProps: interfaceProp) => <UniversalComponent page="About" {...routeProps} />}
			/>
			<RedirectWithStatus status={301} exact from="/" to={`/${lang}`} />
			<Route render={(routeProps: interfaceProp) => <UniversalComponent page="NotFound" {...routeProps} />} />
		</Switch>
		<Footer />
	</Fragment>
);

export default Routes;
