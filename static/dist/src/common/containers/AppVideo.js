"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const Video_1 = tslib_1.__importDefault(require("../components/Video"));
const AddVideo_1 = tslib_1.__importDefault(require("../components/AddVideo"));
const actions = tslib_1.__importStar(require("../store/Profile/actionsProfile"));
const react_redux_1 = require("react-redux");
class AppVideo extends react_1.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { video, dispatch } = this.props;
        if (!Object.keys(video).length) {
            dispatch(actions.getVideo());
        }
    }
    render() {
        return (react_1.default.createElement("div", { id: "pageVideo" },
            react_1.default.createElement(AddVideo_1.default, { value: "Video name", addVideo: this.props.addVideo }),
            react_1.default.createElement("div", { id: "videoPart", className: "part" },
                react_1.default.createElement(Video_1.default, { history: this.props.history, videoList: this.props.video, delVideo: this.props.delVideo }))));
    }
}
const mapStateToProps = state => {
    return {
        video: state.reducerVideo.video,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        addVideo: data => actions.addVideo(data, dispatch),
        delVideo: idBase => dispatch(actions.delVideo(idBase)),
        dispatch: dispatch,
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AppVideo);
