"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
//import { Redirect, Router, Route, IndexRoute, Link } from 'react-router'
const react_router_dom_1 = require("react-router-dom");
const react_1 = tslib_1.__importDefault(require("react"));
const SignIn_1 = tslib_1.__importDefault(require("./components/SignIn"));
const ChatContainer_1 = tslib_1.__importDefault(require("./containers/ChatContainer"));
const SignUp_1 = tslib_1.__importDefault(require("./components/SignUp"));
const AppAudio_1 = tslib_1.__importDefault(require("./containers/AppAudio"));
const AppVideo_1 = tslib_1.__importDefault(require("./containers/AppVideo"));
const ItemsContainer_1 = tslib_1.__importDefault(require("./containers/ItemsContainer"));
const AppMyItem_1 = tslib_1.__importDefault(require("./containers/AppMyItem"));
const AppPictures_1 = tslib_1.__importDefault(require("./containers/AppPictures"));
const AppItem_1 = tslib_1.__importDefault(require("./containers/AppItem"));
const AppUpdate_1 = tslib_1.__importDefault(require("./containers/AppUpdate"));
const WelcomePage_1 = tslib_1.__importDefault(require("./components/WelcomePage"));
const App_1 = tslib_1.__importDefault(require("./containers/App"));
const Main_1 = tslib_1.__importDefault(require("./containers/Main"));
const actionsAuth_1 = require("./store/Auth/actionsAuth");
const requireAuth = (nextState, replace) => {
    if (!actionsAuth_1.checkAuth()) {
        return replace(null, '/signin');
    }
};
const Routes = () => (react_1.default.createElement(react_router_dom_1.Switch, null,
    react_1.default.createElement(App_1.default, null,
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: WelcomePage_1.default }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/welcome", component: WelcomePage_1.default }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/audio", component: AppAudio_1.default }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/video", component: AppVideo_1.default }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/pictures", component: AppPictures_1.default }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/my-profile", component: AppMyItem_1.default }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/profiles/:index", component: AppItem_1.default }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/profiles/:index/update", component: AppUpdate_1.default }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/profiles", component: ItemsContainer_1.default }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/main", component: Main_1.default }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/signin", component: SignIn_1.default }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/signup", component: SignUp_1.default }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/chat", component: ChatContainer_1.default }))));
exports.default = Routes;
