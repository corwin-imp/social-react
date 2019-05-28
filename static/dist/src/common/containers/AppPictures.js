"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_redux_1 = require("react-redux");
const actions = tslib_1.__importStar(require("../store/Profile/actionsProfile"));
const authActions = tslib_1.__importStar(require("../store/Auth/actionsAuth"));
const Pictures_1 = tslib_1.__importDefault(require("../components/Pictures"));
class AppPictures extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { pictures, dispatch } = this.props;
        if (!pictures.length) {
            dispatch(actions.getFiles('get-pictures'));
        }
    }
    render() {
        console.log('props', this.props);
        return (react_1.default.createElement("div", { id: "pagePictures" },
            react_1.default.createElement("div", { id: "picturePart", className: "part" },
                react_1.default.createElement(Pictures_1.default, { history: this.props.history, images: this.props.pictures, rowsValue: 3, choose: select => this.props.setPicture(select, this.props.idUser), dispatch: this.props.dispatch }))));
    }
}
const mapStateToProps = state => {
    return {
        state: state.reducerItems,
        pictures: state.files.pictures,
        idUser: state.auth.user.id,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        delAudio: (id, idBase) => actions.delItem(id, idBase, dispatch),
        getFiles: () => dispatch(actions.getFiles('get-pictures')),
        setPicture: (picture, id) => authActions.setPicture(picture, id, dispatch),
        dispatch: dispatch,
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AppPictures);
