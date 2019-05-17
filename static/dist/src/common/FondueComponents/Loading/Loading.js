import React from 'react';
import styles from './Loading.css';
import logo from '../FondueAssets/images/logo.svg';
function Loading() {
    return (React.createElement("div", { className: styles.loading },
        React.createElement("img", { src: logo, alt: "Loading Logo" })));
}
export default Loading;
