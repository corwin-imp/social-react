"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const howler_1 = require("./howler");
const utils_1 = require("./utils");
class ReactHowler extends react_1.Component {
    constructor(props) {
        super(props);
        this.initHowler = this.initHowler.bind(this);
    }
    componentDidMount() {
        this.initHowler();
    }
    componentWillReceiveProps(props) {
        // The src prop must be either a string or an array of strings
        // Because of this, we can use it's JSON representation to check for changes
        if (JSON.stringify(props.src) !== JSON.stringify(this.props.src)) {
            this.initHowler(props);
        }
        else {
            this.toggleHowler(props);
        }
    }
    componentWillUnmount() {
        this.destroyHowler();
    }
    /**
     * Create howler object with given props
     */
    initHowler(props = this.props) {
        this.destroyHowler();
        if (typeof howler_1.Howl !== 'undefined') {
            // Check if window is available
            this.howler = new howler_1.Howl({
                src: props.src,
                format: props.format,
                mute: props.mute,
                loop: props.loop,
                preload: props.preload,
                volume: props.volume,
                onend: props.onEnd,
                onplay: props.onPlay,
                onpause: props.onPause,
                onvolume: props.onVolume,
                onstop: props.onStop,
                onload: props.onLoad,
                onloaderror: props.onLoadError,
                html5: props.html5,
            });
            if (props.playing) {
                this.play();
            }
        }
    }
    /**
     * Stop, unload and destroy howler object
     */
    destroyHowler() {
        if (this.howler) {
            this.howler.off(); // Remove event listener
            this.howler.stop(); // Stop playback
            this.howler.unload(); // Remove sound from pool
            this.howler = null; // Destroy it
        }
    }
    toggleHowler(props) {
        props.playing ? this.play() : this.pause();
        this.mute(props.mute);
        this.loop(props.loop);
        if (props.volume !== this.props.volume) {
            this.volume(props.volume);
        }
        if (props.seek !== this.seek()) {
            this.seek(props.seek);
        }
    }
    set howler(howl) {
        if (howl) {
            this._howler = howl;
        }
    }
    get howler() {
        return this._howler;
    }
    /**
     * Begins playback of a sound when not playing
     */
    play() {
        const playing = this.howler.playing();
        if (!playing) {
            // Automatically load if we're trying to play
            // and the howl is not loaded
            if (this.howlerState() === 'unloaded') {
                this.load();
            }
            this.howler.play();
        }
    }
    /**
     * Pauses playback of sound or group
     * If no id given, pauses all playback
     * @param {Number} id = undefined [sound of group to pause]
     */
    pause(id = undefined) {
        if (id) {
            this.howler.pause(id);
        }
        else {
            this.howler.pause();
        }
    }
    /**
     * Check the load status of the Howl
     * @return {String} [unloaded, loading or loaded]
     */
    howlerState() {
        return this.howler.state();
    }
    /**
     * Stops playback of sound or group
     * If no id given, stops all playback
     * @param {Number} id = undefined [sound of group to pause]
     */
    stop(id = undefined) {
        if (id) {
            this.howler.stop(id);
        }
        else {
            this.howler.stop();
        }
    }
    /**
     * Mutes the sound, but doesn't pause the playback.
     * @param {Boolean} [muted] [True to mute and false to unmute]
     * @param {Number} [id] [The sound ID. If none is passed, all sounds in group are muted]
     */
    mute(...args) {
        this.howler.mute(...args);
    }
    /**
     * Get/set volume of this sound or the group. This method optionally takes 0, 1 or 2 arguments.
     * @param {Number} [volume] [Volume from 0.0 to 1.0]
     * @param {Number} [id] [The sound ID. If none is passed, all sounds in group are muted]
     */
    volume(...args) {
        return this.howler.volume(...args);
    }
    /**
     * Get/set whether to loop the sound or group. This method can optionally take 0, 1 or 2 arguments.
     * @param {Boolean} [loop] [To loop or not to loop, that is the question]
     * @param {Number} [id] [The sound ID. If none is passed, all sounds in group will have their loop property updated]
     */
    loop(...args) {
        return this.howler.loop(...args);
    }
    /**
     * Set/get current position of player
     * @param  {Number} pos [seek player to position]
     * @return {Number}     [return current position]
     */
    seek(pos = null) {
        if (!this.howler) {
            return 0;
        }
        if (!pos && pos !== 0) {
            return this.howler.seek();
        }
        if (pos || pos === 0) {
            this.howler.seek(pos);
            return pos;
        }
    }
    seePr(pos = null) {
        if (!this.howler) {
            return 0;
        }
        let sk = this.howler.seek();
        return sk / this.duration() * 100 || 0;
    }
    /**
     * Get the duration of the audio source
     * @return {Number} [Audio length in seconds. Will return 0 until after the load event fires]
     */
    duration() {
        return this.howler.duration();
    }
    /**
     * load audio file
     */
    load() {
        this.howler.load();
    }
    /**
     * Only render a placeholder
     */
    render() {
        return react_1.default.createElement('div', null);
    }
}
ReactHowler.propTypes = {
    src: prop_types_1.default.oneOfType([
        prop_types_1.default.string,
        prop_types_1.default.arrayOf(prop_types_1.default.string),
    ]).isRequired,
    format: prop_types_1.default.arrayOf(prop_types_1.default.string),
    playing: prop_types_1.default.bool,
    mute: prop_types_1.default.bool,
    loop: prop_types_1.default.bool,
    preload: prop_types_1.default.bool,
    volume: prop_types_1.default.number,
    onEnd: prop_types_1.default.func,
    onPause: prop_types_1.default.func,
    onPlay: prop_types_1.default.func,
    onVolume: prop_types_1.default.func,
    onStop: prop_types_1.default.func,
    onLoad: prop_types_1.default.func,
    onLoadError: prop_types_1.default.func,
    html5: prop_types_1.default.bool,
};
ReactHowler.defaultProps = {
    playing: true,
    format: [],
    mute: false,
    preload: true,
    loop: false,
    volume: 1.0,
    onEnd: utils_1.noop,
    onPause: utils_1.noop,
    onPlay: utils_1.noop,
    onVolume: utils_1.noop,
    onStop: utils_1.noop,
    onLoad: utils_1.noop,
    onLoadError: utils_1.noop,
    html5: false,
};
exports.default = ReactHowler;
