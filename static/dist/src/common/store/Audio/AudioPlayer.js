'use strict';
import * as tslib_1 from "tslib";
import Device from './Device';
var AudioPlayer = /** @class */ (function (_super) {
    tslib_1.__extends(AudioPlayer, _super);
    function AudioPlayer(name, volumeM) {
        var _this = _super.call(this, name) || this;
        _this._volumeM = volumeM;
        _this._playing = false;
        return _this;
    }
    Object.defineProperty(AudioPlayer.prototype, "volume", {
        get: function () {
            return this._volumeM.volume;
        },
        enumerable: true,
        configurable: true
    });
    AudioPlayer.prototype.incVolume = function () {
        if (!this._power) {
            throw new Error('powerError');
        }
        this._volumeM.incVolume();
    };
    AudioPlayer.prototype.decVolume = function () {
        if (!this._power) {
            throw new Error('powerError');
        }
        this._volumeM.decVolume();
    };
    AudioPlayer.prototype.choose = function (choose) {
        this._playing = true;
        _super.prototype.choose.call(this, choose);
    };
    AudioPlayer.prototype.play = function () {
        if (!this._power) {
            throw new Error('powerError');
        }
        if (this._choose) {
            this._playing = true;
        }
        else {
            throw new Error('choose song');
        }
    };
    AudioPlayer.prototype.pause = function () {
        if (!this._power) {
            throw new Error('powerError');
        }
        if (this._playing) {
            this._playing = false;
        }
    };
    return AudioPlayer;
}(Device));
export default AudioPlayer;
