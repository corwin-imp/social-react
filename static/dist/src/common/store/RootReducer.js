import messages from './Chat/messages';
import channels from './Chat/channels';
import activeChannel from './Chat/activeChannel';
import authReducer from './Auth/reducerAuth';
import typers from './Chat/typers';
import files from './App/files';
import reducerProfile from './Profile/reducerProfile';
import audio from './Audio/reducerAudio';
import reducerVideo from './Video/reducerVideo';
import welcomePage from './App/welcomePage';
import userValidation from './App/userValidation';
import environment from './App/environment';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
var rootReducer = combineReducers({
    messages: messages,
    channels: channels,
    activeChannel: activeChannel,
    auth: authReducer,
    files: files,
    typers: typers,
    audio: audio,
    reducerItems: reducerProfile,
    reducerVideo: reducerVideo,
    welcomePage: welcomePage,
    userValidation: userValidation,
    environment: environment,
    formReducer: formReducer,
});
export default rootReducer;
