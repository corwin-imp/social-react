import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Howl } from './howler';
import { noop } from './utils';
var ReactHowler = /** @class */ (function (_super) {
    tslib_1.__extends(ReactHowler, _super);
    function ReactHowler(props) {
        var _this = _super.call(this, props) || this;
        _this.initHowler = _this.initHowler.bind(_this);
        return _this;
    }
    ReactHowler.prototype.componentDidMount = function () {
        this.initHowler();
    };
    ReactHowler.prototype.componentWillReceiveProps = function (props) {
        // The src prop must be either a string or an array of strings
        // Because of this, we can use it's JSON representation to check for changes
        if (JSON.stringify(props.src) !== JSON.stringify(this.props.src)) {
            this.initHowler(props);
        }
        else {
            this.toggleHowler(props);
        }
    };
    ReactHowler.prototype.componentWillUnmount = function () {
        this.destroyHowler();
    };
    /**
     * Create howler object with given props
     */
    ReactHowler.prototype.initHowler = function (props) {
        if (props === void 0) { props = this.props; }
        this.destroyHowler();
        if (typeof Howl !== 'undefined') {
            // Check if window is available
            this.howler = new Howl({
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
    };
    /**
     * Stop, unload and destroy howler object
     */
    ReactHowler.prototype.destroyHowler = function () {
        if (this.howler) {
            this.howler.off(); // Remove event listener
            this.howler.stop(); // Stop playback
            this.howler.unload(); // Remove sound from pool
            this.howler = null; // Destroy it
        }
    };
    ReactHowler.prototype.toggleHowler = function (props) {
        props.playing ? this.play() : this.pause();
        this.mute(props.mute);
        this.loop(props.loop);
        if (props.volume !== this.props.volume) {
            this.volume(props.volume);
        }
        if (props.seek !== this.seek()) {
            this.seek(props.seek);
        }
    };
    Object.defineProperty(ReactHowler.prototype, "howler", {
        get: function () {
            return this._howler;
        },
        set: function (howl) {
            if (howl) {
                this._howler = howl;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Begins playback of a sound when not playing
     */
    ReactHowler.prototype.play = function () {
        var playing = this.howler.playing();
        if (!playing) {
            // Automatically load if we're trying to play
            // and the howl is not loaded
            if (this.howlerState() === 'unloaded') {
                this.load();
            }
            this.howler.play();
        }
    };
    /**
     * Pauses playback of sound or group
     * If no id given, pauses all playback
     * @param {Number} id = undefined [sound of group to pause]
     */
    ReactHowler.prototype.pause = function (id) {
        if (id === void 0) { id = undefined; }
        if (id) {
            this.howler.pause(id);
        }
        else {
            this.howler.pause();
        }
    };
    /**
     * Check the load status of the Howl
     * @return {String} [unloaded, loading or loaded]
     */
    ReactHowler.prototype.howlerState = function () {
        return this.howler.state();
    };
    /**
     * Stops playback of sound or group
     * If no id given, stops all playback
     * @param {Number} id = undefined [sound of group to pause]
     */
    ReactHowler.prototype.stop = function (id) {
        if (id === void 0) { id = undefined; }
        if (id) {
            this.howler.stop(id);
        }
        else {
            this.howler.stop();
        }
    };
    /**
     * Mutes the sound, but doesn't pause the playback.
     * @param {Boolean} [muted] [True to mute and false to unmute]
     * @param {Number} [id] [The sound ID. If none is passed, all sounds in group are muted]
     */
    ReactHowler.prototype.mute = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.howler).mute.apply(_a, args);
    };
    /**
     * Get/set volume of this sound or the group. This method optionally takes 0, 1 or 2 arguments.
     * @param {Number} [volume] [Volume from 0.0 to 1.0]
     * @param {Number} [id] [The sound ID. If none is passed, all sounds in group are muted]
     */
    ReactHowler.prototype.volume = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = this.howler).volume.apply(_a, args);
    };
    /**
     * Get/set whether to loop the sound or group. This method can optionally take 0, 1 or 2 arguments.
     * @param {Boolean} [loop] [To loop or not to loop, that is the question]
     * @param {Number} [id] [The sound ID. If none is passed, all sounds in group will have their loop property updated]
     */
    ReactHowler.prototype.loop = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = this.howler).loop.apply(_a, args);
    };
    /**
     * Set/get current position of player
     * @param  {Number} pos [seek player to position]
     * @return {Number}     [return current position]
     */
    ReactHowler.prototype.seek = function (pos) {
        if (pos === void 0) { pos = null; }
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
    };
    ReactHowler.prototype.seePr = function (pos) {
        if (pos === void 0) { pos = null; }
        if (!this.howler) {
            return 0;
        }
        var sk = this.howler.seek();
        return sk / this.duration() * 100 || 0;
    };
    /**
     * Get the duration of the audio source
     * @return {Number} [Audio length in seconds. Will return 0 until after the load event fires]
     */
    ReactHowler.prototype.duration = function () {
        return this.howler.duration();
    };
    /**
     * load audio file
     */
    ReactHowler.prototype.load = function () {
        this.howler.load();
    };
    /**
     * Only render a placeholder
     */
    ReactHowler.prototype.render = function () {
        return React.createElement('div', null);
    };
    return ReactHowler;
}(Component));
ReactHowler.propTypes = {
    src: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    format: PropTypes.arrayOf(PropTypes.string),
    playing: PropTypes.bool,
    mute: PropTypes.bool,
    loop: PropTypes.bool,
    preload: PropTypes.bool,
    volume: PropTypes.number,
    onEnd: PropTypes.func,
    onPause: PropTypes.func,
    onPlay: PropTypes.func,
    onVolume: PropTypes.func,
    onStop: PropTypes.func,
    onLoad: PropTypes.func,
    onLoadError: PropTypes.func,
    html5: PropTypes.bool,
};
ReactHowler.defaultProps = {
    playing: true,
    format: [],
    mute: false,
    preload: true,
    loop: false,
    volume: 1.0,
    onEnd: noop,
    onPause: noop,
    onPlay: noop,
    onVolume: noop,
    onStop: noop,
    onLoad: noop,
    onLoadError: noop,
    html5: false,
};
export default ReactHowler;
