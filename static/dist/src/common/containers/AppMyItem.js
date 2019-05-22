"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_redux_1 = require("react-redux");
const ItemInfo_1 = tslib_1.__importDefault(require("./../components/ItemInfo"));
const actions = tslib_1.__importStar(require("../store/Profile/actionsProfile"));
const authActions = tslib_1.__importStar(require("../store/Auth/actionsAuth"));
class AppMyItem extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { audio, video, pictures, dispatch, music } = this.props;
        if (!pictures.length) {
            dispatch(actions.getFiles('get-pictures'));
        }
        if (!music.length) {
            dispatch(actions.getFiles('get-music'));
        }
        if (!Object.keys(video).length) {
            dispatch(actions.getVideo());
        }
    }
    render() {
        const { audio } = this.props;
        audio['music'] = this.props.music;
        if (this.props.user) {
            let userItem = this.props.user;
            userItem.status = true;
            return (react_1.default.createElement("div", { id: "pageProfile" },
                react_1.default.createElement(ItemInfo_1.default, { item: userItem, history: this.props.history, idItem: this.props.user.id, idUser: this.props.idUser, delItem: this.props.delItem, setPicture: this.props.setPicture, video: this.props.video, audio: audio, pictures: this.props.pictures, src: this.props.src, dispatch: this.props.dispatch })));
        }
        else {
            return false;
        }
    }
}
const mapStateToProps = state => {
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
const mapDispatchToProps = function (dispatch, props) {
    return {
        delItem: idBase => dispatch(actions.delItem(idBase)),
        setPicture: (picture, id) => authActions.setPicture(picture, id, dispatch),
        dispatch: dispatch,
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AppMyItem);
