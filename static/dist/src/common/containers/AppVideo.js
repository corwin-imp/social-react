import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import Video from '../components/Video';
import AddVideo from '../components/AddVideo';
import * as actions from '../store/Profile/actionsProfile';
import { connect } from 'react-redux';
var AppVideo = /** @class */ (function (_super) {
    tslib_1.__extends(AppVideo, _super);
    function AppVideo(props) {
        return _super.call(this, props) || this;
    }
    AppVideo.prototype.componentDidMount = function () {
        var _a = this.props, video = _a.video, dispatch = _a.dispatch;
        if (!Object.keys(video).length) {
            dispatch(actions.getVideo());
        }
    };
    AppVideo.prototype.render = function () {
        return (React.createElement("div", { id: "pageVideo" },
            React.createElement(AddVideo, { value: "Video name", addVideo: this.props.addVideo }),
            React.createElement("div", { id: "videoPart", className: "part" },
                React.createElement(Video, { history: this.props.history, videoList: this.props.video, delVideo: this.props.delVideo }))));
    };
    return AppVideo;
}(Component));
var mapStateToProps = function (state) {
    return {
        video: state.reducerVideo.video,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        addVideo: function (data) { return actions.addVideo(data, dispatch); },
        delVideo: function (idBase) { return dispatch(actions.delVideo(idBase)); },
        dispatch: dispatch,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppVideo);
