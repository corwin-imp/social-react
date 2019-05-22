import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import ChatsNavbar from './ChatsNavbar';
import ChatsList from './ChatsList';
var Container = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  height: 100vh;\n"], ["\n  height: 100vh;\n"])));
var ChatsListScreen = function () {
    return (React.createElement(Container, null,
        "33333",
        React.createElement(ChatsNavbar, null),
        React.createElement(ChatsList, null)));
};
export default ChatsListScreen;
var templateObject_1;
