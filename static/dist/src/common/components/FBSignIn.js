import React from 'react';
import { Button } from 'react-bootstrap';
var FBSignIn = function (props) {
    return (React.createElement("section", { style: { justifyContent: 'center', display: 'flex' } },
        React.createElement("a", { style: { margin: 'auto', width: '20em', height: '3.5em' }, href: "/api/auth/facebook" },
            React.createElement(Button, { bsStyle: "primary", style: { margin: 'auto', width: '20em', height: '3.5em' } },
                React.createElement("p", { style: { margin: '0', padding: '0', fontSize: '1.5em' } },
                    React.createElement("i", { className: "fa fa-facebook", style: { marginRight: '1em' } }),
                    "Sign In With Facebook")))));
};
export default FBSignIn;
