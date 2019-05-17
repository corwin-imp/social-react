import React, { Component, Fragment } from 'react';
import {Head} from '../../FondueComponents/Head';
import { RouteComponentProps } from 'react-router-dom';
import { ContentPusher, Container, Readable } from '../../FondueComponents/Layout';

const dataEn = require('./data-about-en.md');
const dataDe = require('./data-about-de.md');
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import { t } from '../../FondueComponents/Languages';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);

class About extends Component<RouteComponentProps<{lang: string}>> {
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
		const { lang } = this.props.match.params;

		return (
			<Fragment>
				<Head title="ReactFondue • About" />
				<ContentPusher>
					<Container>
						<Readable>
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

export default About;
