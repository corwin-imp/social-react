import '../common/css/mainApp.sass'
import '../common/css/chatapp.css'
import '../common/css/itemsList.css'
import '../common/css/pageProfile.css'
import '../common/css/pageProfiles.css'
import '../common/css/pageVideo.css'
import '../common/css/dropzone.min.css'

import '../common/css/addVideo.css'
import '../common/css/audio.css'

import React from 'react'
import ReactDOM from 'react-dom'

import { browserHistory } from 'react-router'

import { Router } from 'react-router'
import { Provider } from 'react-redux'
import store from '../common/store/configureStore'
import DevTools from '../common/containers/DevTools'
import routes from '../common/routes'

const rootElement = document.getElementById('react')

ReactDOM.render(
  <Provider store={store}>
    <div style={{ height: '100%' }}>
      <Router children={routes} history={browserHistory} />
      {process.env.NODE_ENV !== 'production' && <DevTools />}
    </div>
  </Provider>,
  rootElement
)
