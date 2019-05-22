"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_google_tag_manager_1 = tslib_1.__importDefault(require("react-google-tag-manager"));
class GoogleTagManager extends react_1.default.Component {
    componentDidMount() {
        const dataLayerName = this.props.dataLayerName || 'dataLayer';
        const scriptId = this.props.scriptId || 'react-google-tag-manager-gtm';
        if (!window[dataLayerName]) {
            const gtmScriptNode = document.getElementById(scriptId);
            eval(gtmScriptNode.textContent);
        }
    }
    render() {
        const gtm = react_google_tag_manager_1.default({
            id: this.props.gtmId,
            dataLayerName: this.props.dataLayerName || 'dataLayer',
            additionalEvents: this.props.additionalEvents || {},
            previewVariables: this.props.previewVariables || false,
            scheme: this.props.scheme || 'https:',
        });
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("div", null, gtm.noScriptAsReact()),
            react_1.default.createElement("div", { id: this.props.scriptId || 'react-google-tag-manager-gtm' }, gtm.scriptAsReact())));
    }
}
exports.default = GoogleTagManager;
