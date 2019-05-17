import * as tslib_1 from "tslib";
import React from 'react';
import ReactHowler from './howler/ReactHowler';
import raf from 'raf'; // requestAnimationFrame polyfill
import Button from './Button';
import * as actions from '../store/Audio/actionsAudio';
import * as actionsF from '../store/Profile/actionsProfile';
import List from './List';
import FontAwesome from 'react-fontawesome';
import DropzoneComponent from 'react-dropzone-component';
var Audio = /** @class */ (function (_super) {
    tslib_1.__extends(Audio, _super);
    function Audio(props) {
        var _this = _super.call(this, props) || this;
        _this.load = function (index) {
            var dispatch = _this.props.dispatch;
            dispatch(actions.load(index));
        };
        _this.ondelete = function (file, index) {
            console.log('onDelete');
            var dispatch = _this.props.dispatch;
            dispatch(actionsF.removeFile('music', file + ".mp3", index));
        };
        var _a = _this.props.audio, playing = _a.playing, src = _a.src, progress = _a.progress, seek = _a.seek, volume = _a.volume;
        _this.state = {
            playing: playing,
            src: src,
            loaded: false,
            loop: false,
            progress: progress,
            seek: seek,
            upload: false,
            in_set_progress_mode: false,
            mute: false,
            volume: volume,
        };
        _this.componentConfig = {
            iconFiletypes: ['.mp3'],
            showFiletypeIcon: true,
            postUrl: '/ftp/add-file',
        };
        _this.djsConfig = {
            acceptedFiles: "audio/*",
            autoProcessQueue: false,
            uploadMultiple: true,
            parallelUploads: 10,
            maxFiles: 10,
            addRemoveLinks: true,
        };
        _this.dropzone = null;
        _this.eventHandlers = {
            init: function (dz) { return _this.dropzone = dz; },
            successmultiple: _this.completeFile.bind(_this),
        };
        _this.Time = "00.00";
        _this.is_progress_dirty = false;
        if (src === false) {
            _this.interval_id = setInterval(_this.onUpdate.bind(_this), 500);
        }
        else if (!_this.props.top && seek) {
            _this.interval_id = setInterval(_this.onUpdate.bind(_this), 500);
        }
        _this.handleToggle = _this.handleToggle.bind(_this);
        _this.onPlayerNext = _this.onPlayerNext.bind(_this);
        _this.onPlayerPrev = _this.onPlayerPrev.bind(_this);
        _this.handleOnLoad = _this.handleOnLoad.bind(_this);
        _this.handleOnEnd = _this.handleOnEnd.bind(_this);
        _this.UploadZone = _this.UploadZone.bind(_this);
        _this.handleOnPlay = _this.handleOnPlay.bind(_this);
        _this.handleStop = _this.handleStop.bind(_this);
        _this.renderSeekPos = _this.renderSeekPos.bind(_this);
        _this.renderSeekPr = _this.renderSeekPr.bind(_this);
        _this.load = _this.load.bind(_this);
        _this.ondelete = _this.ondelete.bind(_this);
        _this.handleLoopToggle = _this.handleLoopToggle.bind(_this);
        _this.handleMuteToggle = _this.handleMuteToggle.bind(_this);
        return _this;
    }
    Audio.prototype.onUpdate = function () {
        var seek = this.props.audio.seek;
        if (this.player) {
            if (!this.is_progress_dirty) {
                this.setState({
                    progress: this.state.seek / this.state.duration,
                });
            }
            if (this.player.ended && this.props.onDone) {
                this.props.onDone(this.state.src);
            }
        }
    };
    Audio.prototype.onPlayerNext = function () {
        var dispatch = this.props.dispatch;
        dispatch(actions.onPlayerNext());
    };
    /* */
    Audio.prototype.onSongDone = function (src) {
        this.onPlayerNext();
    };
    Audio.prototype.onPlayerPrev = function () {
        var dispatch = this.props.dispatch;
        dispatch(actions.onPlayerPrev());
    };
    Audio.prototype.componentWillUnmount = function () {
        var dispatch = this.props.dispatch;
        if (!this.props.top) {
            dispatch(actions.trigMount());
        }
        this.clearRAF();
    };
    Audio.prototype.handleToggle = function () {
        var dispatch = this.props.dispatch;
        dispatch(actions.handleToggle());
    };
    Audio.prototype.handleOnLoad = function () {
        var seek = this.props.audio.seek;
        if (seek) {
            this.player.seek(seek);
        }
        this.setState({
            loaded: true,
            duration: this.player.duration(),
        });
    };
    Audio.prototype.handleOnPlay = function () {
        this.setState({
            playing: true,
        });
        this.renderSeekPr();
        this.renderSeekPos();
    };
    Audio.prototype.handleOnEnd = function () {
        this.setState({
            playing: false,
        });
        this.clearRAF();
    };
    Audio.prototype.handleStop = function () {
        this.player.stop();
        this.setState({
            playing: false,
        });
        this.renderSeekPos();
        this.renderSeekPr();
    };
    Audio.prototype.handleLoopToggle = function () {
        this.setState({
            loop: !this.state.loop,
        });
    };
    Audio.prototype.handleMuteToggle = function () {
        this.setState({
            mute: !this.state.mute,
        });
    };
    Audio.prototype.renderSeekPos = function () {
        if (this.player) {
            var seek = Number(this.player.seek());
            if (!isNaN(seek)) {
                this.setState({
                    seek: Number(this.player.seek()),
                });
                var minutes = parseInt(seek / 60);
                var seconds = parseInt(seek % 60);
                if (minutes < 10)
                    minutes = '0' + minutes;
                if (seconds < 10)
                    seconds = '0' + seconds;
                this.Time = minutes + "." + seconds;
                if (this.state.playing) {
                    this._raf = raf(this.renderSeekPos);
                }
            }
        }
    };
    Audio.prototype.renderSeekPr = function () {
        if (this.player) {
            this.setState({
                seekPr: this.player.seePr(),
            });
            if (this.state.playing) {
                this._raf = raf(this.renderSeekPr);
            }
        }
    };
    Audio.prototype.clearRAF = function () {
        raf.cancel(this._raf);
    };
    Audio.prototype.startSetProgress = function (evt) {
        this.setState({
            in_set_progress_mode: true,
        });
        this.setProgress(evt);
    };
    Audio.prototype.stopSetProgress = function (evt) {
        this.setState({
            in_set_progress_mode: false,
        });
        this.setProgress(evt);
    };
    Audio.prototype.setProgress = function (evt) {
        var dispatch = this.props.dispatch;
        if (this.state.in_set_progress_mode) {
            var prog = (evt.clientX - offsetLeft(this._progress_bar)) /
                this._progress_bar.clientWidth;
            var sk = this.state.duration * (100 * prog) / 100 || 0;
            dispatch(actions.setProgress(prog, sk));
        }
    };
    Audio.prototype.componentWillMount = function () {
        var mount = this.props.audio.mount;
        if (!mount && !this.props.top) {
            this.props.dispatch(actions.trigMount());
        }
    };
    Audio.prototype.UploadZone = function () {
        this.setState({
            upload: !this.state.upload,
        });
    };
    Audio.prototype.handlePost = function () {
        this.dropzone.processQueue();
    };
    Audio.prototype.completeFile = function (file) {
        var dispatch = this.props.dispatch;
        console.log(file);
        this.setState({
            upload: !this.state.upload
        });
        dispatch(actionsF.getFiles('get-music'));
    };
    Audio.prototype.componentWillReceiveProps = function (nextProps) {
        var dispatch = this.props.dispatch;
        var _a = nextProps.audio, src = _a.src, playing = _a.playing, seek = _a.seek, volume = _a.volume, mount = _a.mount;
        if (src !== this.state.src) {
            this.setState({
                src: src,
                playing: playing,
            });
        }
        else if (playing !== this.state.playing) {
            this.setState({
                playing: playing,
            });
        }
        else if (this.player && seek !== this.props.audio.seek) {
            this.setState({
                progress: seek / this.state.duration,
                seek: seek,
            });
            if (this.player) {
                this.player.seek(seek);
            }
        }
        else if (this.props.top && nextProps.path == '/audio') {
            if (!mount && seek !== this.state.seek) {
                dispatch(actions.setProgress(this.state.progress, this.state.seek));
            }
        }
        if (this.state.volume != volume) {
            this.setState({
                volume: volume,
            });
        }
        //console.log('howler',ReactHowler);
    };
    Audio.prototype.render = function () {
        var _this = this;
        var _a = this.props.audio, music = _a.music, keyWord = _a.keyWord, src = _a.src;
        if (!keyWord && this.props.top) {
            return false;
        }
        if (this.state.src === false && music.length) {
            src = 0;
        }
        var durTime = '00.00';
        if (this.state.duration) {
            var dTime = this.state.duration / 60;
            var dtimeS = dTime - Math.floor(dTime);
            dtimeS = dtimeS * 60 / 100;
            durTime = Number(dTime.toFixed()) + Number(dtimeS.toFixed(2));
        }
        return (React.createElement("div", { className: "Audio " + (this.props.top &&
                this.props.path == '/audio' &&
                'hidden') },
            React.createElement("div", { className: "audioPlayer" },
                React.createElement("div", { className: "leftControls" },
                    React.createElement(Button, { onClick: this.onPlayerPrev, onCl: "btnAudio", text: React.createElement(FontAwesome, { className: "super-crazy-colors", name: "angle-left", size: "2x", style: { textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' } }) }),
                    React.createElement(Button, { onClick: this.handleToggle, text: this.state.playing ? (React.createElement(FontAwesome, { className: "super-crazy-colors", name: "pause", size: "lg", style: { textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' } })) : (React.createElement(FontAwesome, { className: "super-crazy-colors", name: "play", size: "lg" })) }),
                    React.createElement(Button, { onClick: this.onPlayerNext, text: React.createElement(FontAwesome, { className: "super-crazy-colors", name: "angle-right", size: "2x", style: { textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' } }) }),
                    React.createElement("label", { className: "againBtn" },
                        React.createElement(FontAwesome, { className: "super-crazy-colors", name: "redo", size: "lg" }),
                        React.createElement("input", { className: "hidden", type: "checkbox", checked: this.state.loop, onChange: this.handleLoopToggle }))),
                React.createElement("div", { className: "centerAudio" },
                    src !== false ? (React.createElement("div", { className: "current-song" }, music[src]['name'])) : (''),
                    React.createElement("div", { onMouseDown: this.startSetProgress.bind(this), onMouseMove: this.setProgress.bind(this), onMouseLeave: this.stopSetProgress.bind(this), onMouseUp: this.stopSetProgress.bind(this), className: "progress" },
                        React.createElement("div", { ref: function (ref) { return (_this._progress_bar = ref); }, className: "bar" },
                            React.createElement("div", { style: { width: this.state.progress * 100 + '%' } })))),
                React.createElement("div", { className: "rightControls" },
                    React.createElement("div", { className: "time" },
                        this.Time,
                        ' / ',
                        durTime),
                    React.createElement("div", { className: "volume" },
                        React.createElement("label", null,
                            this.state.volume.toFixed(2),
                            React.createElement("span", { className: "slider-container" },
                                React.createElement("input", { type: "range", min: "0", max: "1", step: ".05", value: this.state.volume, onChange: function (e) {
                                        return _this.props.dispatch(actions.volume(parseFloat(e.target.value)));
                                    }, style: { verticalAlign: 'bottom' } }))))),
                src !== false ? (React.createElement(ReactHowler, { src: music[src]['href'], playing: this.state.playing, onLoad: this.handleOnLoad, onPlay: this.handleOnPlay, onEnd: this.handleOnEnd, loop: this.state.loop, mute: this.state.mute, volume: this.props.top ? this.state.volume : 0, ref: function (ref) { return (_this.player = ref); } })) : ('')),
            React.createElement("button", { onClick: this.UploadZone, className: "btn btnZone" },
                React.createElement("span", { className: "up" }, "Upload"),
                React.createElement(FontAwesome, { className: "super-crazy-colors", name: "upload", size: "lg" })),
            this.state.upload && (React.createElement("div", { className: "dropZoneCont" },
                React.createElement(DropzoneComponent, { eventHandlers: this.eventHandlers, djsConfig: this.djsConfig, config: this.componentConfig }),
                React.createElement("button", { className: "btnUp btn", onClick: this.handlePost.bind(this) }, "Upload"))),
            music ? (React.createElement(List, { classValue: "audioList", title: "Playlist", playing: this.state.playing ? src : false, onChoose: function (href, name) { return _this.load(href, name); }, classN: "playList", ondelete: this.ondelete, items: music })) : ('')));
    };
    return Audio;
}(React.Component));
function offsetLeft(el) {
    var left = 0;
    while (el && el !== document) {
        left += el.offsetLeft;
        el = el.offsetParent;
    }
    return left;
}
export default Audio;
