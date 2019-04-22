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

import ProviderWrap from "./Provider";

const rootElement = document.getElementById('react')

ReactDOM.render(<ProviderWrap />,
  rootElement
)
