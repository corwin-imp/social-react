"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_redux_1 = require("react-redux");
const actions = tslib_1.__importStar(require("../store/Profile/actionsProfile"));
const Audio_1 = tslib_1.__importDefault(require("../components/Audio"));
class AppAudio extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { dispatch } = this.props;
    }
    render() {
        const { audio } = this.props;
        audio['music'] = this.props.music;
        return (react_1.default.createElement("div", { id: "pageAudio" },
            react_1.default.createElement(Audio_1.default, { top: false, audio: audio, path: this.props.location.pathname, dispatch: this.props.dispatch })));
    }
}
const mapStateToProps = state => {
    return {
        audio: state.audio,
        music: state.files.music,
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        delAudio: (id, idBase) => actions.delItem(id, idBase, dispatch),
        dispatch: dispatch,
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AppAudio);
