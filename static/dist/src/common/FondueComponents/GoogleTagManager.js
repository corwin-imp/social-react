import * as tslib_1 from "tslib";
import React from 'react';
import gtmParts from 'react-google-tag-manager';
var GoogleTagManager = /** @class */ (function (_super) {
    tslib_1.__extends(GoogleTagManager, _super);
    function GoogleTagManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GoogleTagManager.prototype.componentDidMount = function () {
        var dataLayerName = this.props.dataLayerName || 'dataLayer';
        var scriptId = this.props.scriptId || 'react-google-tag-manager-gtm';
        if (!window[dataLayerName]) {
            var gtmScriptNode = document.getElementById(scriptId);
            eval(gtmScriptNode.textContent);
        }
    };
    GoogleTagManager.prototype.render = function () {
        var gtm = gtmParts({
            id: this.props.gtmId,
            dataLayerName: this.props.dataLayerName || 'dataLayer',
            additionalEvents: this.props.additionalEvents || {},
            previewVariables: this.props.previewVariables || false,
            scheme: this.props.scheme || 'https:',
        });
        return (React.createElement("div", null,
            React.createElement("div", null, gtm.noScriptAsReact()),
            React.createElement("div", { id: this.props.scriptId || 'react-google-tag-manager-gtm' }, gtm.scriptAsReact())));
    };
    return GoogleTagManager;
}(React.Component));
export default GoogleTagManager;
