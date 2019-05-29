'use strict'

export default class Profile {
  name: string;
  username: string;
  city: string;
  country: string;
  channels: string;
  age: string;
  gender: string;
  email: string;
  picture: string;
  id: any;
  _chooseAudio: string;
  _choosePhoto: string;
  _chooseVideo: string;
  _Audiolist: any;
  _photosList: any;
  _videoList: any;
  _choose: any;
  _status: any;
  typeList: any;

  constructor( person: any) {
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

  choose(choose: any, typeList:any) {
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
  getlist(typeList: any) {
    if (!this._status) {
      throw new Error('statusError')
    }
    return this.typeList
  }
  setlist(list:any, typeList: any) {
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
