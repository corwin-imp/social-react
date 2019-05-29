"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Provider_1 = tslib_1.__importDefault(require("./Provider"));
const react_loadable_1 = tslib_1.__importDefault(require("react-loadable"));
const react_1 = tslib_1.__importDefault(require("react"));
const react_dom_1 = tslib_1.__importDefault(require("react-dom"));
const react_hot_loader_1 = require("react-hot-loader");
require("../common/css/mainApp.sass");
require("../common/css/chatapp.css");
require("../common/css/itemsList.css");
require("../common/css/pageProfile.css");
require("../common/css/pageProfiles.css");
require("../common/css/pageVideo.css");
require("../common/css/dropzone.min.css");
require("../common/css/addVideo.css");
require("../common/css/audio.css");
const rootElement = document.getElementById('react');
const renderMethod = react_dom_1.default.hydrate;
function render(Component) {
    renderMethod(react_1.default.createElement(react_hot_loader_1.AppContainer, null,
        react_1.default.createElement(Component, null)), document.getElementById('react-root'));
}
react_loadable_1.default.preloadReady().then(() => {
    render(Provider_1.default);
});
if (module.hot) {
    module.hot.accept('./Provider.tsx', () => {
        const { ProviderWrap: Provider } = require('./Provider.tsx');
        render(Provider);
    });
}
