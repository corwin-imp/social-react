'use strict'
import Device from './Device'
export default class AudioPlayer extends Device {
  constructor(name, volumeM) {
    super(name)
    this._volumeM = volumeM
    this._playing = false
  }
  get volume() {
    return this._volumeM.volume
  }
  incVolume() {
    if (!this._power) {
      throw new Error('powerError')
    }
    this._volumeM.incVolume()
  }
  decVolume() {
    if (!this._power) {
      throw new Error('powerError')
    }
    this._volumeM.decVolume()
  }
  choose(choose) {
    this._playing = true
    super.choose(choose)
  }
  play() {
    if (!this._power) {
      throw new Error('powerError')
    }
    if (this._choose) {
      this._playing = true
    } else {
      throw new Error('choose song')
    }
  }
  pause() {
    if (!this._power) {
      throw new Error('powerError')
    }
    if (this._playing) {
      this._playing = false
    }
  }
}
