import '../common/css/mainApp.sass';
import '../common/css/chatapp.css';
import '../common/css/itemsList.css';
import '../common/css/pageProfile.css';
import '../common/css/pageProfiles.css';
import '../common/css/pageVideo.css';
import '../common/css/dropzone.min.css';
import '../common/css/addVideo.css';
import '../common/css/audio.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import ProviderWrap from "./Provider";
var rootElement = document.getElementById('react');
var renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
function render(Component) {
    renderMethod(React.createElement(AppContainer, null,
        React.createElement(Component, null)), document.getElementById('react-root'));
}
render(ProviderWrap);
if (module.hot) {
    module.hot.accept('./Provider.js', function () {
        var NewAppRoot = require('./Provider.js').default;
        render(NewAppRoot);
    });
    module.hot.accept('./Provider.js', function () {
        var Provider = require('./Provider.js').ProviderWrap;
        render(Provider);
    });
}
