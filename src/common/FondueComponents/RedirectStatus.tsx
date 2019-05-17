import React from 'react';
import {Route, Redirect, RouteComponentProps} from 'react-router';

type CacheOpts = {
	status: number;

};
interface Options {
	staticContext?: CacheOpts

}
export const RedirectWithStatus:React.FC<{from?: string,to?: string,status?: number, exact?: any }> =
	({ from, to, status }) => {

	return (
		<Route
			render={({ staticContext }: Options & RouteComponentProps<any> ) => {
				if (staticContext) {
					staticContext.status = status;
				}
				return <Redirect from={from} to={to} />;
			}}
		/>
	);
}
