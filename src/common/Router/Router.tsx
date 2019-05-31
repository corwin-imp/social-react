import React, { Fragment } from 'react';
import GoogleTagManager from '../FondueComponents/GoogleTagManager';
import {Head} from '../FondueComponents/Head';
import Nav from '../FondueComponents/Nav';
import {Footer} from '../FondueComponents/Footer';

import { hot } from "react-hot-loader";
import { Route, Switch, RouteComponentProps } from 'react-router';
import { RedirectWithStatus } from '../FondueComponents/RedirectStatus';
import routesList from './routesList';
import '../FondueComponents/FondueAssets/css/styles.css';
const isProd = process.env.NODE_ENV === 'production';

interface interfaceProp extends RouteComponentProps<{
    todoListId: string
}> {}

const Routes = (props:any) => {

    const {lang} = props

    return (
        <Fragment>
            {isProd ? <GoogleTagManager gtmId="GTM-WFTXGC8" /> : ''}
            <Head />
            <Nav lang={lang} />
            <Switch>
                {routesList.map(item =>
                <Route
                    exact={item.exact}
                    path={item.path}
                    component={item.component}
                />
                )}



            </Switch>
            <Footer />
        </Fragment>
    );
}
/*
   <RedirectWithStatus status={301} exact from="/" to={`/${lang}`} />
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
<Route
	exact
	path="/:lang/chats"
	render={(routeProps: interfaceProp) => <UniversalComponent page="Chats" {...routeProps} />}
/>
<Route render={(routeProps: interfaceProp) => <UniversalComponent page="NotFound" {...routeProps} />} />


<Route exact path="/" component={LoadableTop} />
<Route path="/orgs/:org" component={LoadableOrgs} />
<Route component={LoadableNotFound} />
*/

export default hot(module)(Routes);
