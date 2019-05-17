import React from 'react';
import { Route, Redirect } from 'react-router';
export var RedirectWithStatus = function (_a) {
    var from = _a.from, to = _a.to, status = _a.status;
    return (React.createElement(Route, { render: function (_a) {
            var staticContext = _a.staticContext;
            if (staticContext) {
                staticContext.status = status;
            }
            return React.createElement(Redirect, { from: from, to: to });
        } }));
};
