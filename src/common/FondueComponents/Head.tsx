import React from 'react';
import { Helmet } from 'react-helmet';
import * as favicon from './FondueAssets/img/favicon.ico';

const isProd = process.env.NODE_ENV === 'production';

const Head: React.SFC<{title?:string,description?:string, image?:string}> =({
	title = 'ReactFondue • Minimal boilerplate with code splitting, hot module reload and server side rendering',
	description = 'ReactFondue is minimal React boilerplate with support for code splitting, hot module reload and server side rendering.',
	image = 'https://i.postimg.cc/543n5bF6/preview.jpg',
	children,
})=> {
	return (
		<Helmet encodeSpecialCharacters={true}>
			<meta http-equiv="" content="IE=edge" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="description" content={description} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={image} />
			<link rel="shortcut icon" href={favicon} type="image/x-icon" />
			<link rel="icon" sizes="192x192" href="https://i.postimg.cc/FRsbCkJ1/192.jpg" />
			<link rel="apple-touch-icon-precomposed" href="https://i.postimg.cc/FRsbCkJ1/192.jpg" />
			{children && children}
			<title>{title}</title>
		</Helmet>
	);
}

export {Head};
