import * as tslib_1 from "tslib";
import React, { Component, Fragment } from 'react';
import { Head } from '../../FondueComponents/Head';
import { ContentPusher, Container, Readable } from '../../FondueComponents/Layout';
var dataEn = require('./data-about-en.md');
var dataDe = require('./data-about-de.md');
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
var About = /** @class */ (function (_super) {
    tslib_1.__extends(About, _super);
    function About() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    About.prototype.componentDidMount = function () {
        var cdx = document.getElementsByTagName('pre');
        if (cdx.length) {
            var i = void 0;
            for (i = 0; i < cdx.length; i++) {
                hljs.highlightBlock(cdx[i]);
            }
        }
    };
    About.prototype.render = function () {
        var lang = this.props.match.params.lang;
        return (React.createElement(Fragment, null,
            React.createElement(Head, { title: "ReactFondue \u2022 About" }),
            React.createElement(ContentPusher, null,
                React.createElement(Container, null,
                    React.createElement(Readable, null,
                        lang === 'en' && (React.createElement("div", { dangerouslySetInnerHTML: { __html: dataEn.__content } })),
                        lang === 'de' && (React.createElement("div", { dangerouslySetInnerHTML: { __html: dataDe.__content } })))))));
    };
    return About;
}(Component));
export default About;
