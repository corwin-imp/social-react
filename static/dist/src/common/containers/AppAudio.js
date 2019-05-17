import * as tslib_1 from "tslib";
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/Profile/actionsProfile';
import Audio from '../components/Audio';
var AppAudio = /** @class */ (function (_super) {
    tslib_1.__extends(AppAudio, _super);
    function AppAudio(props) {
        return _super.call(this, props) || this;
    }
    AppAudio.prototype.componentDidMount = function () {
        var dispatch = this.props.dispatch;
    };
    AppAudio.prototype.render = function () {
        var audio = this.props.audio;
        audio['music'] = this.props.music;
        return (React.createElement("div", { id: "pageAudio" },
            React.createElement(Audio, { top: false, audio: audio, path: this.props.location.pathname, dispatch: this.props.dispatch })));
    };
    return AppAudio;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        audio: state.audio,
        music: state.files.music,
    };
};
var mapDispatchToProps = function (dispatch, props) {
    return {
        delAudio: function (id, idBase) { return actions.delItem(id, idBase, dispatch); },
        dispatch: dispatch,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppAudio);
