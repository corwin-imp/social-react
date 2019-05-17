import * as tslib_1 from "tslib";
import React from 'react';
import { connect } from 'react-redux';
import ItemInfo from './../components/ItemInfo';
import * as actions from '../store/Profile/actionsProfile';
import * as authActions from '../store/Auth/actionsAuth';
var AppMyItem = /** @class */ (function (_super) {
    tslib_1.__extends(AppMyItem, _super);
    function AppMyItem(props) {
        return _super.call(this, props) || this;
    }
    AppMyItem.prototype.componentDidMount = function () {
        var _a = this.props, audio = _a.audio, video = _a.video, pictures = _a.pictures, dispatch = _a.dispatch, music = _a.music;
        if (!pictures.length) {
            dispatch(actions.getFiles('get-pictures'));
        }
        if (!music.length) {
            dispatch(actions.getFiles('get-music'));
        }
        if (!Object.keys(video).length) {
            dispatch(actions.getVideo());
        }
    };
    AppMyItem.prototype.render = function () {
        var audio = this.props.audio;
        audio['music'] = this.props.music;
        if (this.props.user) {
            var userItem = this.props.user;
            userItem.status = true;
            return (React.createElement("div", { id: "pageProfile" },
                React.createElement(ItemInfo, { item: userItem, history: this.props.history, idItem: this.props.user.id, idUser: this.props.idUser, delItem: this.props.delItem, setPicture: this.props.setPicture, video: this.props.video, audio: audio, pictures: this.props.pictures, src: this.props.src, dispatch: this.props.dispatch })));
        }
        else {
            return false;
        }
    };
    return AppMyItem;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        state: state,
        items: state.reducerItems.items,
        user: state.auth.user,
        pictures: state.files.pictures,
        audio: state.audio,
        music: state.files.music,
        video: state.reducerVideo.video,
        idUser: state.auth.user.id,
    };
};
var mapDispatchToProps = function (dispatch, props) {
    return {
        delItem: function (idBase) { return dispatch(actions.delItem(idBase)); },
        setPicture: function (picture, id) { return authActions.setPicture(picture, id, dispatch); },
        dispatch: dispatch,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppMyItem);
