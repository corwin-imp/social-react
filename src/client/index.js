import ProviderWrap from "./Provider";
import Loadable from "react-loadable";
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader';

import '../common/css/mainApp.sass'
import '../common/css/chatapp.css'
import '../common/css/itemsList.css'
import '../common/css/pageProfile.css'
import '../common/css/pageProfiles.css'
import '../common/css/pageVideo.css'
import '../common/css/dropzone.min.css'

import '../common/css/addVideo.css'
import '../common/css/audio.css'


const rootElement = document.getElementById('react')

const renderMethod = ReactDOM.hydrate;

function render(Component) {
    renderMethod(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('react-root')
    );
}


Loadable.preloadReady().then(() => {
    render(ProviderWrap);
});

if (module.hot) {
    module.hot.accept('./Provider.js', () => {
        const { ProviderWrap: Provider } = require('./Provider.js');
        render(Provider);
    });
}
