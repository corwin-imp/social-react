import * as tslib_1 from "tslib";
import React from 'react';
import Button from './Button';
import ReactPlayer from 'react-player';
var Video = /** @class */ (function (_super) {
    tslib_1.__extends(Video, _super);
    function Video(props) {
        var _this = _super.call(this, props) || this;
        _this.onPlay = function () {
            _this.setState({ playing: true });
        };
        _this.state = {
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
        return _this;
        // this.history = [];
    }
    Video.prototype.handleToggle = function () {
        this.setState({
            playing: !this.state.playing,
        });
    };
    Video.prototype.render = function () {
        var _this = this;
        var videoList = this.props.videoList;
        var value = this.props.item;
        var idItem = Number(this.props.idItem);
        var _a = this.state, url = _a.url, playing = _a.playing, volume = _a.volume, muted = _a.muted, loop = _a.loop, played = _a.played, loaded = _a.loaded, duration = _a.duration, playbackRate = _a.playbackRate;
        if (!videoList) {
            return false;
        }
        return (React.createElement("div", { className: "videoList" }, Object.keys(videoList).map(function (keyOf, index) { return (React.createElement("div", { className: "video", key: index },
            React.createElement(ReactPlayer, { ref: _this.ref, className: "react-player", width: "100%", height: "100%", url: videoList[keyOf].href, controls: true, playing: playing, loop: loop, playbackRate: playbackRate, volume: volume, muted: muted, onReady: function () { return console.log('onReady'); }, onStart: function () { return console.log('onStart'); }, onBuffer: function () { return console.log('onBuffer'); }, onSeek: function (e) { return console.log('onSeek', e); }, onEnded: _this.onEnded, onError: function (e) { return console.log('onError', e); }, onProgress: _this.onProgress, onDuration: _this.onDuration }),
            _this.props.delVideo ? (React.createElement("div", { className: "btnVideo" },
                React.createElement(Button, { onCl: "btnWarn", onClick: function () { return _this.props.delVideo(keyOf); }, text: "Delete" }))) : (''))); })));
    };
    return Video;
}(React.Component));
export default Video;
