import messages from './Chat/messages'
import channels from './Chat/channels'
import activeChannel from './Chat/activeChannel'
import authReducer from './Auth/reducerAuth'
import typers from './App/typers'
import files from './App/files'
import reducerProfile from './Profile/reducerProfile'
import audio from './audio'
import reducerVideo from './Video/reducerVideo'
import welcomePage from './App/welcomePage'
import userValidation from './App/userValidation'
import environment from './App/environment'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  messages,
  channels,
  activeChannel,
  auth: authReducer,
  files,
  typers,
  audio,
  reducerItems: reducerProfile,
  reducerVideo,
  welcomePage,
  userValidation,
  environment,
  formReducer,
})

export default rootReducer
