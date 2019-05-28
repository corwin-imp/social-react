"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const Button_1 = tslib_1.__importDefault(require("./Button"));
const react_player_1 = tslib_1.__importDefault(require("react-player"));
class Video extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.onPlay = () => {
            this.setState({ playing: true });
        };
        this.state = {
            playing: false,
            url: null,
            loaded: false,
            loop: false,
            name: '',
            progress: 0,
            in_set_progress_mode: false,
            mute: false,
            volume: 1.0,
        };
        // this.history = [];
    }
    handleToggle() {
        this.setState({
            playing: !this.state.playing,
        });
    }
    render() {
        let { videoList } = this.props;
        let value = this.props.item;
        let idItem = Number(this.props.idItem);
        const { url, playing, volume, muted, loop, played, loaded, duration, playbackRate, } = this.state;
        if (!videoList) {
            return false;
        }
        return (react_1.default.createElement("div", { className: "videoList" }, Object.keys(videoList).map((keyOf, index) => (react_1.default.createElement("div", { className: "video", key: index },
            react_1.default.createElement(react_player_1.default, { ref: this.ref, className: "react-player", width: "100%", height: "100%", url: videoList[keyOf].href, controls: true, playing: playing, loop: loop, playbackRate: playbackRate, volume: volume, muted: muted, onReady: () => console.log('onReady'), onStart: () => console.log('onStart'), onBuffer: () => console.log('onBuffer'), onSeek: e => console.log('onSeek', e), onEnded: this.onEnded, onError: e => console.log('onError', e), onProgress: this.onProgress, onDuration: this.onDuration }),
            this.props.delVideo ? (react_1.default.createElement("div", { className: "btnVideo" },
                react_1.default.createElement(Button_1.default, { onCl: "btnWarn", onClick: () => this.props.delVideo(keyOf), text: "Delete" }))) : (''))))));
    }
}
exports.default = Video;
