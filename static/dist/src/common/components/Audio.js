"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const ReactHowler_1 = tslib_1.__importDefault(require("./howler/ReactHowler"));
const raf_1 = tslib_1.__importDefault(require("raf")); // requestAnimationFrame polyfill
const Button_1 = tslib_1.__importDefault(require("./Button"));
const actions = tslib_1.__importStar(require("../store/Audio/actionsAudio"));
const actionsF = tslib_1.__importStar(require("../store/Profile/actionsProfile"));
const List_1 = tslib_1.__importDefault(require("./List"));
const react_fontawesome_1 = tslib_1.__importDefault(require("react-fontawesome"));
const react_dropzone_component_1 = tslib_1.__importDefault(require("react-dropzone-component"));
class Audio extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.load = index => {
            const { dispatch } = this.props;
            dispatch(actions.load(index));
        };
        this.ondelete = (file, index) => {
            console.log('onDelete');
            const { dispatch } = this.props;
            dispatch(actionsF.removeFile('music', `${file}.mp3`, index));
        };
        const { playing, src, progress, seek, volume } = this.props.audio;
        this.state = {
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
        this.componentConfig = {
            iconFiletypes: ['.mp3'],
            showFiletypeIcon: true,
            postUrl: '/ftp/add-file',
        };
        this.djsConfig = {
            acceptedFiles: "audio/*",
            autoProcessQueue: false,
            uploadMultiple: true,
            parallelUploads: 10,
            maxFiles: 10,
            addRemoveLinks: true,
        };
        this.dropzone = null;
        this.eventHandlers = {
            init: dz => this.dropzone = dz,
            successmultiple: this.completeFile.bind(this),
        };
        this.Time = `00.00`;
        this.is_progress_dirty = false;
        if (src === false) {
            this.interval_id = setInterval(this.onUpdate.bind(this), 500);
        }
        else if (!this.props.top && seek) {
            this.interval_id = setInterval(this.onUpdate.bind(this), 500);
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.onPlayerNext = this.onPlayerNext.bind(this);
        this.onPlayerPrev = this.onPlayerPrev.bind(this);
        this.handleOnLoad = this.handleOnLoad.bind(this);
        this.handleOnEnd = this.handleOnEnd.bind(this);
        this.UploadZone = this.UploadZone.bind(this);
        this.handleOnPlay = this.handleOnPlay.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.renderSeekPos = this.renderSeekPos.bind(this);
        this.renderSeekPr = this.renderSeekPr.bind(this);
        this.load = this.load.bind(this);
        this.ondelete = this.ondelete.bind(this);
        this.handleLoopToggle = this.handleLoopToggle.bind(this);
        this.handleMuteToggle = this.handleMuteToggle.bind(this);
    }
    onUpdate() {
        let { seek } = this.props.audio;
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
    }
    onPlayerNext() {
        const { dispatch } = this.props;
        dispatch(actions.onPlayerNext());
    }
    /* */
    onSongDone(src) {
        this.onPlayerNext();
    }
    onPlayerPrev() {
        const { dispatch } = this.props;
        dispatch(actions.onPlayerPrev());
    }
    componentWillUnmount() {
        const { dispatch } = this.props;
        if (!this.props.top) {
            dispatch(actions.trigMount());
        }
        this.clearRAF();
    }
    handleToggle() {
        const { dispatch } = this.props;
        dispatch(actions.handleToggle());
    }
    handleOnLoad() {
        const { seek } = this.props.audio;
        if (seek) {
            this.player.seek(seek);
        }
        this.setState({
            loaded: true,
            duration: this.player.duration(),
        });
    }
    handleOnPlay() {
        this.setState({
            playing: true,
        });
        this.renderSeekPr();
        this.renderSeekPos();
    }
    handleOnEnd() {
        this.setState({
            playing: false,
        });
        this.clearRAF();
    }
    handleStop() {
        this.player.stop();
        this.setState({
            playing: false,
        });
        this.renderSeekPos();
        this.renderSeekPr();
    }
    handleLoopToggle() {
        this.setState({
            loop: !this.state.loop,
        });
    }
    handleMuteToggle() {
        this.setState({
            mute: !this.state.mute,
        });
    }
    renderSeekPos() {
        if (this.player) {
            var seek = Number(this.player.seek());
            if (!isNaN(seek)) {
                this.setState({
                    seek: Number(this.player.seek()),
                });
                let minutes = parseInt(seek / 60);
                let seconds = parseInt(seek % 60);
                if (minutes < 10)
                    minutes = '0' + minutes;
                if (seconds < 10)
                    seconds = '0' + seconds;
                this.Time = `${minutes}.${seconds}`;
                if (this.state.playing) {
                    this._raf = raf_1.default(this.renderSeekPos);
                }
            }
        }
    }
    renderSeekPr() {
        if (this.player) {
            this.setState({
                seekPr: this.player.seePr(),
            });
            if (this.state.playing) {
                this._raf = raf_1.default(this.renderSeekPr);
            }
        }
    }
    clearRAF() {
        raf_1.default.cancel(this._raf);
    }
    startSetProgress(evt) {
        this.setState({
            in_set_progress_mode: true,
        });
        this.setProgress(evt);
    }
    stopSetProgress(evt) {
        this.setState({
            in_set_progress_mode: false,
        });
        this.setProgress(evt);
    }
    setProgress(evt) {
        const { dispatch } = this.props;
        if (this.state.in_set_progress_mode) {
            var prog = (evt.clientX - offsetLeft(this._progress_bar)) /
                this._progress_bar.clientWidth;
            let sk = this.state.duration * (100 * prog) / 100 || 0;
            dispatch(actions.setProgress(prog, sk));
        }
    }
    componentWillMount() {
        const { mount } = this.props.audio;
        if (!mount && !this.props.top) {
            this.props.dispatch(actions.trigMount());
        }
    }
    UploadZone() {
        this.setState({
            upload: !this.state.upload,
        });
    }
    handlePost() {
        this.dropzone.processQueue();
    }
    completeFile(file) {
        const { dispatch } = this.props;
        console.log(file);
        this.setState({
            upload: !this.state.upload
        });
        dispatch(actionsF.getFiles('get-music'));
    }
    componentWillReceiveProps(nextProps) {
        const { dispatch } = this.props;
        const { src, playing, seek, volume, mount } = nextProps.audio;
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
    }
    render() {
        let { music, keyWord, src } = this.props.audio;
        if (!keyWord && this.props.top) {
            return false;
        }
        if (this.state.src === false && music.length) {
            src = 0;
        }
        let durTime = '00.00';
        if (this.state.duration) {
            let dTime = this.state.duration / 60;
            let dtimeS = dTime - Math.floor(dTime);
            dtimeS = dtimeS * 60 / 100;
            durTime = Number(dTime.toFixed()) + Number(dtimeS.toFixed(2));
        }
        return (react_1.default.createElement("div", { className: `Audio ${this.props.top &&
                this.props.path == '/audio' &&
                'hidden'}` },
            react_1.default.createElement("div", { className: "audioPlayer" },
                react_1.default.createElement("div", { className: "leftControls" },
                    react_1.default.createElement(Button_1.default, { onClick: this.onPlayerPrev, onCl: "btnAudio", text: react_1.default.createElement(react_fontawesome_1.default, { className: "super-crazy-colors", name: "angle-left", size: "2x", style: { textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' } }) }),
                    react_1.default.createElement(Button_1.default, { onClick: this.handleToggle, text: this.state.playing ? (react_1.default.createElement(react_fontawesome_1.default, { className: "super-crazy-colors", name: "pause", size: "lg", style: { textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' } })) : (react_1.default.createElement(react_fontawesome_1.default, { className: "super-crazy-colors", name: "play", size: "lg" })) }),
                    react_1.default.createElement(Button_1.default, { onClick: this.onPlayerNext, text: react_1.default.createElement(react_fontawesome_1.default, { className: "super-crazy-colors", name: "angle-right", size: "2x", style: { textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' } }) }),
                    react_1.default.createElement("label", { className: "againBtn" },
                        react_1.default.createElement(react_fontawesome_1.default, { className: "super-crazy-colors", name: "redo", size: "lg" }),
                        react_1.default.createElement("input", { className: "hidden", type: "checkbox", checked: this.state.loop, onChange: this.handleLoopToggle }))),
                react_1.default.createElement("div", { className: "centerAudio" },
                    src !== false ? (react_1.default.createElement("div", { className: "current-song" }, music[src]['name'])) : (''),
                    react_1.default.createElement("div", { onMouseDown: this.startSetProgress.bind(this), onMouseMove: this.setProgress.bind(this), onMouseLeave: this.stopSetProgress.bind(this), onMouseUp: this.stopSetProgress.bind(this), className: "progress" },
                        react_1.default.createElement("div", { ref: ref => (this._progress_bar = ref), className: "bar" },
                            react_1.default.createElement("div", { style: { width: this.state.progress * 100 + '%' } })))),
                react_1.default.createElement("div", { className: "rightControls" },
                    react_1.default.createElement("div", { className: "time" },
                        this.Time,
                        ' / ',
                        durTime),
                    react_1.default.createElement("div", { className: "volume" },
                        react_1.default.createElement("label", null,
                            this.state.volume.toFixed(2),
                            react_1.default.createElement("span", { className: "slider-container" },
                                react_1.default.createElement("input", { type: "range", min: "0", max: "1", step: ".05", value: this.state.volume, onChange: e => this.props.dispatch(actions.volume(parseFloat(e.target.value))), style: { verticalAlign: 'bottom' } }))))),
                src !== false ? (react_1.default.createElement(ReactHowler_1.default, { src: music[src]['href'], playing: this.state.playing, onLoad: this.handleOnLoad, onPlay: this.handleOnPlay, onEnd: this.handleOnEnd, loop: this.state.loop, mute: this.state.mute, volume: this.props.top ? this.state.volume : 0, ref: ref => (this.player = ref) })) : ('')),
            react_1.default.createElement("button", { onClick: this.UploadZone, className: "btn btnZone" },
                react_1.default.createElement("span", { className: "up" }, "Upload"),
                react_1.default.createElement(react_fontawesome_1.default, { className: "super-crazy-colors", name: "upload", size: "lg" })),
            this.state.upload && (react_1.default.createElement("div", { className: "dropZoneCont" },
                react_1.default.createElement(react_dropzone_component_1.default, { eventHandlers: this.eventHandlers, djsConfig: this.djsConfig, config: this.componentConfig }),
                react_1.default.createElement("button", { className: "btnUp btn", onClick: this.handlePost.bind(this) }, "Upload"))),
            music ? (react_1.default.createElement(List_1.default, { classValue: "audioList", title: "Playlist", playing: this.state.playing ? src : false, onChoose: (href, name) => this.load(href, name), classN: "playList", ondelete: this.ondelete, items: music })) : ('')));
    }
}
function offsetLeft(el) {
    var left = 0;
    while (el && el !== document) {
        left += el.offsetLeft;
        el = el.offsetParent;
    }
    return left;
}
exports.default = Audio;
