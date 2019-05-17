'use strict';
var VolumeM = /** @class */ (function () {
    function VolumeM() {
        this._volume = 0;
    }
    Object.defineProperty(VolumeM.prototype, "volume", {
        get: function () {
            return this._volume;
        },
        enumerable: true,
        configurable: true
    });
    VolumeM.prototype.incVolume = function () {
        if (this._volume < 10) {
            this._volume++;
        }
    };
    VolumeM.prototype.decVolume = function () {
        if (this._volume > 0) {
            this._volume--;
        }
    };
    VolumeM.prototype.toString = function () {
        return " /volume: " + this._volume;
    };
    return VolumeM;
}());
export default VolumeM;
