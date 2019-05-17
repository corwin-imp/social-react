import * as tslib_1 from "tslib";
import React from 'react';
import { connect } from 'react-redux';
import ItemInfo from './../components/ItemInfo';
import * as actions from '../store/Profile/actionsProfile';
import * as authActions from '../store/Auth/actionsAuth';
var AppItem = /** @class */ (function (_super) {
    tslib_1.__extends(AppItem, _super);
    function AppItem(props) {
        return _super.call(this, props) || this;
    }
    AppItem.prototype.componentDidMount = function () {
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
    AppItem.prototype.render = function () {
        var audio = this.props.audio;
        audio['music'] = this.props.music;
        var id = this.props.params.index;
        if (!this.props.item) {
            return false;
        }
        return (React.createElement("div", { className: "profile", id: "pageProfile" },
            React.createElement(ItemInfo, { item: this.props.item, history: this.props.history, idItem: id, delItem: this.props.delItem, idUser: this.props.idUser, video: this.props.video, audio: audio, pictures: this.props.pictures, setPicture: this.props.setPicture, src: this.props.src, dispatch: this.props.dispatch })));
    };
    return AppItem;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        state: state.reducerItems,
        item: state.reducerItems.item,
        pictures: state.files.pictures,
        audio: state.audio,
        music: state.files.music,
        video: state.reducerVideo.video,
        idUser: state.auth.user.id,
    };
};
var mapDispatchToProps = function (dispatch, props) {
    dispatch(actions.getItem(props.params.index));
    return {
        delItem: function (idBase) { return dispatch(actions.delItem(idBase)); },
        setPicture: function (picture, id) { return authActions.setPicture(picture, id, dispatch); },
        dispatch: dispatch,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppItem);
