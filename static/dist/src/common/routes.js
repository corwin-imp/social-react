//import { Redirect, Router, Route, IndexRoute, Link } from 'react-router'
import { Switch, Route } from 'react-router-dom';
import React from 'react';
import SignIn from './components/SignIn';
import ChatContainer from './containers/ChatContainer';
import SignUp from './components/SignUp';
import AppAudio from './containers/AppAudio';
import AppVideo from './containers/AppVideo';
import ItemsContainer from './containers/ItemsContainer';
import AppMyItem from './containers/AppMyItem';
import AppPictures from './containers/AppPictures';
import AppItem from './containers/AppItem';
import AppUpdate from './containers/AppUpdate';
import WelcomePage from './components/WelcomePage';
import App from './containers/App';
import Main from './containers/Main';
import { checkAuth } from './store/Auth/actionsAuth';
var requireAuth = function (nextState, replace) {
    if (!checkAuth()) {
        return replace(null, '/signin');
    }
};
var Routes = function () { return (React.createElement(Switch, null,
    React.createElement(App, null,
        React.createElement(Route, { exact: true, path: "/", component: WelcomePage }),
        React.createElement(Route, { exact: true, path: "/welcome", component: WelcomePage }),
        React.createElement(Route, { exact: true, path: "/audio", component: AppAudio }),
        React.createElement(Route, { exact: true, path: "/video", component: AppVideo }),
        React.createElement(Route, { exact: true, path: "/pictures", component: AppPictures }),
        React.createElement(Route, { exact: true, path: "/my-profile", component: AppMyItem }),
        React.createElement(Route, { exact: true, path: "/profiles/:index", component: AppItem }),
        React.createElement(Route, { exact: true, path: "/profiles/:index/update", component: AppUpdate }),
        React.createElement(Route, { exact: true, path: "/profiles", component: ItemsContainer }),
        React.createElement(Route, { exact: true, path: "/main", component: Main }),
        React.createElement(Route, { exact: true, path: "/signin", component: SignIn }),
        React.createElement(Route, { exact: true, path: "/signup", component: SignUp }),
        React.createElement(Route, { exact: true, path: "/chat", component: ChatContainer })))); };
export default Routes;
