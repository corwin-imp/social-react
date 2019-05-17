import * as React from "react";
import * as styles from './Loading.scss';
var Loading = function () {
    return (React.createElement("div", { className: styles.loading },
        React.createElement("div", { className: styles.inner },
            React.createElement("div", { className: styles.spinner },
                React.createElement("div", { className: styles.bubble1 }),
                React.createElement("div", { className: styles.bubble2 })))));
};
export { Loading };
