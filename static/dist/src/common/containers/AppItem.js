"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_redux_1 = require("react-redux");
const ItemInfo_1 = tslib_1.__importDefault(require("./../components/ItemInfo"));
const actions = tslib_1.__importStar(require("../store/Profile/actionsProfile"));
const authActions = tslib_1.__importStar(require("../store/Auth/actionsAuth"));
class AppItem extends react_1.default.Component {
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
        let id = this.props.params.Chats;
        if (!this.props.item) {
            return false;
        }
        return (react_1.default.createElement("div", { className: "profile", id: "pageProfile" },
            react_1.default.createElement(ItemInfo_1.default, { item: this.props.item, history: this.props.history, idItem: id, delItem: this.props.delItem, idUser: this.props.idUser, video: this.props.video, audio: audio, pictures: this.props.pictures, setPicture: this.props.setPicture, src: this.props.src, dispatch: this.props.dispatch })));
    }
}
const mapStateToProps = state => {
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
const mapDispatchToProps = (dispatch, props) => {
    dispatch(actions.getItem(props.params.Chats));
    return {
        delItem: idBase => dispatch(actions.delItem(idBase)),
        setPicture: (picture, id) => authActions.setPicture(picture, id, dispatch),
        dispatch: dispatch,
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AppItem);
