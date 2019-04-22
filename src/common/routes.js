//import { Redirect, Router, Route, IndexRoute, Link } from 'react-router'
import { Switch, withRouter, Route } from 'react-router-dom';

import React from 'react'

import SignIn from './components/SignIn'
import ChatContainer from './containers/ChatContainer'
import SignUp from './components/SignUp'
import AppAudio from './containers/AppAudio'
import AppVideo from './containers/AppVideo'
import ItemsContainer from './containers/ItemsContainer'
import AppMyItem from './containers/AppMyItem'
import AppPictures from './containers/AppPictures'
import AppItem from './containers/AppItem'
import AppUpdate from './containers/AppUpdate'
import NotFound from './containers/NotFound'
import WelcomePage from './components/WelcomePage'
import App from './containers/App'
import Main from './containers/Main'
import { checkAuth } from './store/Auth/actionsAuth'

const requireAuth = (nextState, replace) => {
  if (!checkAuth()) {
    return replace(null, '/signin')
  }
}

const Routes = () =>(
    <Switch>
        <App>
            <Route exact path="/" component={WelcomePage} />
            <Route exact path="/welcome" component={WelcomePage} />
            <Route exact path="/audio" component={AppAudio} />
            <Route exact path="/video" component={AppVideo} />
            <Route exact path="/pictures" component={AppPictures} />
            <Route exact path="/my-profile" component={AppMyItem} />
            <Route exact path="/profiles/:index" component={AppItem} />
            <Route exact path="/profiles/:index/update" component={AppUpdate} />
            <Route exact path="/profiles" component={ItemsContainer} />
            <Route exact path="/main" component={Main} />
            <Route  exact path="/signin" component={SignIn} />
            <Route  exact path="/signup" component={SignUp} />
            <Route exact path="/chat" component={ChatContainer} />
        </App>
    </Switch>
)

export default Routes
