import React, { Fragment } from 'react';
import universal from 'react-universal-component';
import GoogleTagManager from '../FondueComponents/GoogleTagManager';
import Head from '../FondueComponents/Head';
import Nav from '../FondueComponents/Nav';
import Footer from '../FondueComponents/Footer';
import { Route, Switch, Redirect } from 'react-router';
import { RedirectWithStatus } from '../FondueComponents/RedirectStatus';
import { Loading } from '../FondueComponents/Layout';
import '../FondueAssets/css/styles.css';

const isProd = process.env.NODE_ENV === 'production';

const UniversalComponent = universal(props => import(`../Views/${props.page}`), {
	loading: () => <Loading />,
	ignoreBabelRename: true,
});

export default ({ staticContext, lang }) => (
	<Fragment>
		{isProd ? <GoogleTagManager gtmId="GTM-WFTXGC8" /> : ''}
		<Head />
		<Nav lang={lang} />
		<Switch>
			<Route
				exact
				path="/:lang"
				render={routeProps => <UniversalComponent page="Home" {...routeProps} />}
			/>
			<Route
				exact
				path="/:lang/about"
				render={routeProps => <UniversalComponent page="About" {...routeProps} />}
			/>
			<RedirectWithStatus status={301} exact from="/" to={`/${lang}`} />
			<Route render={routeProps => <UniversalComponent page="NotFound" {...routeProps} />} />
		</Switch>
		<Footer />
	</Fragment>
);
