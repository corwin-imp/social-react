"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const styles = tslib_1.__importStar(require("./Loading.scss"));
const Loading = () => {
    return (React.createElement("div", { className: styles.loading },
        React.createElement("div", { className: styles.inner },
            React.createElement("div", { className: styles.spinner },
                React.createElement("div", { className: styles.bubble1 }),
                React.createElement("div", { className: styles.bubble2 })))));
};
exports.Loading = Loading;
