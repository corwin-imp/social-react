import { Redirect, Router, Route, IndexRoute, Link } from 'react-router'
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
import { checkAuth } from './actions/authActions'

const requireAuth = (nextState, replace) => {
  if (!checkAuth()) {
    return replace(null, '/signin')
  }
}

const Routes = (
  <Route path="/" component={App}>
    <IndexRoute component={WelcomePage} />
    <Route path="/welcome" component={WelcomePage} />
    <Route path="/audio" component={AppAudio} />
    <Route path="/video" component={AppVideo} />
    <Route path="/pictures" component={AppPictures} />

    <Route path="/my-profile" component={AppMyItem} />

    <Route path="/profiles/:index" component={AppItem} />
    <Route path="/profiles/:index/update" component={AppUpdate} />

    <Route path="/profiles" component={ItemsContainer} />
    <Route path="/main" component={Main} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/chat" component={ChatContainer} />
  </Route>
)

export default Routes
