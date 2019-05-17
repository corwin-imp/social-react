import React, { Component, Fragment } from 'react';
import {Head} from '../../FondueComponents/Head';
import { RouteComponentProps } from 'react-router-dom';
import { ContentPusher, Container, Readable } from '../../FondueComponents/Layout';

const dataEn = require('./data-home-en.md');
const dataDe = require('./data-home-de.md');

import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
/*const javascript = hljs.getLanguage.getLanguage('javascript')
const css = hljs.getLanguage.getLanguage('css')*/

import { t } from '../../FondueComponents/Languages';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);

class Home extends Component<RouteComponentProps<{lang: string}>> {
	componentDidMount() {
		const cdx = document.getElementsByTagName('pre');
		if (cdx.length) {
			let i;
			for (i = 0; i < cdx.length; i++) {
				hljs.highlightBlock(cdx[i]);
			}
		}
	}

	render() {
		console.log('ds')
		let lang = ''

		if(this.props.match){
			lang = this.props.match.params.lang;
		}


		return (
			<Fragment>
				<Head />
				dddd
				<ContentPusher>
					<Container>
						<Readable>
							uuu
							{lang === 'en' && (
								<div

									dangerouslySetInnerHTML={{ __html: dataEn.__content }}
								/>
							)}
							{lang === 'de' && (
								<div

									dangerouslySetInnerHTML={{ __html: dataDe.__content }}
								/>
							)}
						</Readable>
					</Container>
				</ContentPusher>
			</Fragment>
		);
	}
}

export default Home;
