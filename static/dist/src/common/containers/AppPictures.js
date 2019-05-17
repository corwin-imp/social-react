import * as tslib_1 from "tslib";
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/Profile/actionsProfile';
import * as authActions from '../store/Auth/actionsAuth';
import Pictures from '../components/Pictures';
var AppPictures = /** @class */ (function (_super) {
    tslib_1.__extends(AppPictures, _super);
    function AppPictures(props) {
        return _super.call(this, props) || this;
    }
    AppPictures.prototype.componentDidMount = function () {
        var _a = this.props, pictures = _a.pictures, dispatch = _a.dispatch;
        if (!pictures.length) {
            dispatch(actions.getFiles('get-pictures'));
        }
    };
    AppPictures.prototype.render = function () {
        var _this = this;
        console.log('props', this.props);
        return (React.createElement("div", { id: "pagePictures" },
            React.createElement("div", { id: "picturePart", className: "part" },
                React.createElement(Pictures, { history: this.props.history, images: this.props.pictures, rowsValue: 3, choose: function (select) { return _this.props.setPicture(select, _this.props.idUser); }, dispatch: this.props.dispatch }))));
    };
    return AppPictures;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        state: state.reducerItems,
        pictures: state.files.pictures,
        idUser: state.auth.user.id,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        delAudio: function (id, idBase) { return actions.delItem(id, idBase, dispatch); },
        getFiles: function () { return dispatch(actions.getFiles('get-pictures')); },
        setPicture: function (picture, id) { return authActions.setPicture(picture, id, dispatch); },
        dispatch: dispatch,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppPictures);
