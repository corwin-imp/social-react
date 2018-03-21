'use strict'
export default class VolumeM {
  constructor() {
    this._volume = 0
  }
  get volume() {
    return this._volume
  }
  incVolume() {
    if (this._volume < 10) {
      this._volume++
    }
  }
  decVolume() {
    if (this._volume > 0) {
      this._volume--
    }
  }
  toString() {
    return ` /volume: ${this._volume}`
  }
}
