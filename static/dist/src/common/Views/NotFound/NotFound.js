import React, { Fragment } from 'react';
import { Head } from '../../FondueComponents/Head';
import { Status } from '../../FondueComponents/Status';
import { ContentPusher, Container, Readable } from '../../FondueComponents/Layout';
function NotFound() {
    return (React.createElement(Fragment, null,
        React.createElement(Head, { title: "React SSR Boilerplate \u2022 Not Found" }),
        React.createElement(Status, { code: 404 }),
        React.createElement(ContentPusher, null,
            React.createElement(Container, null,
                React.createElement(Readable, null,
                    React.createElement("h1", null, "Not Found"),
                    React.createElement("p", null, "404 Error - Page not found."))))));
}
export default NotFound;
