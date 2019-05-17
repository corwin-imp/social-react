import React from 'react';
import { Route } from 'react-router';
export function Status(_a) {
    var code = _a.code;
    return (React.createElement(Route, { render: function (_a) {
            var staticContext = _a.staticContext;
            if (staticContext) {
                staticContext.status = code;
            }
            return null;
        } }));
}
