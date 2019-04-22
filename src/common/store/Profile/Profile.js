'use strict'
export default class Profile {
  constructor(person) {
    this.name = person.local.username
    this.username = person.local.username
    this.city = person.local.city
    this.country = person.local.country
    this.channels = person.local.channels
    this.age = person.local.age
    this.gender = person.local.gender
    this.email = person.local.email
    this.picture = person.local.picture
    this.id = person._id
    this.status = person.status

    this._chooseAudio = ''
    this._choosePhoto = ''
    this._chooseVideo = ''
    this._Audiolist = []
    this._photosList = []
    this._videoList = []
  }

  choose(choose, typeList) {
    if (choose === undefined) {
      return this._choose
    } else {
      if (!this._status) {
        throw new Error('statusError')
      }
      if (this.typeList.indexOf(choose) != -1) {
        this._choose = choose
      } else {
        throw new Error('not in list')
      }
    }
  }
  getlist(typeList) {
    if (!this._status) {
      throw new Error('statusError')
    }
    return this.typeList
  }
  setlist(list, typeList) {
    //
    if (!this._status) {
      throw new Error('statusError')
    }
    if (Array.isArray(list)) {
      this.typeList = list
    } else {
      throw new Error('list must be array')
    }
  }
  set status(status) {
    if (typeof status == 'boolean') {
      this._status = status
    }
  }
  get status() {
    return this._status
  }
}
