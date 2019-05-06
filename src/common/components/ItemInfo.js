import React from 'react'
import Button from './Button'


import List from './List'
import { Link } from 'react-router-dom'
import Audio from './Audio'

import Video from './Video'
import * as actions from '../store/Audio/actionsAudio'
import Pictures from './Pictures'
export default class ItemInfo extends React.Component {
  constructor(props) {
    super(props)
  }

  load = index => {
    const { dispatch } = this.props

    dispatch(actions.load(index))
  }

  render() {
    let value = this.props.item
    let valueParams = {
      age: value.age,
      gender: value.gender,
      country: value.country,
      city: value.city,
      email: value.email,
    }

    let index = this.props.idItem
    let allVideo = this.props.video
    let keysVid = Object.keys(allVideo)

    if (keysVid.length > 3) {
      var videos = []
      for (let i = 0; i < 4; i++) {
        if (keysVid[i]) {
          videos[keysVid[i]] = allVideo[keysVid[i]]
        }
      }
    } else {
      let allVideo = this.props.video

      let keysVid = Object.keys(allVideo)
      var videos = []
      for (let i = 0; i < 2; i++) {
        if (keysVid[i]) {
          videos[keysVid[i]] = allVideo[keysVid[i]]
        }
      }
    }
    return (
      <div id="itemInfo">
        <div className="itemContent">
          <div className="part" id="imagePart">
            <div className="itemImage">
              <img
                src={
                  value.picture
                    ? value.picture
                    : require('../images/profile.png')
                }
              />
            </div>
          </div>
          <div className="part" id="imagesPart">
            <Link className="title" to="/pictures">
              Pictures:
            </Link>
            <div className="picturesItem">
              <Pictures
                history={this.props.history}
                rowsValue={0}
                images={this.props.pictures}
                choose={select =>
                  this.props.setPicture(select, this.props.idUser)
                }
              />
            </div>
          </div>
          <div className="part" id="audioPart">
            <Link className="title" to="/audio">
              Audio:
            </Link>
            <List
              classValue="audioList"
              title="Playlist"
              playing={this.props.audio.playing ? this.props.audio.src : false}
              onChoose={(href, name) => this.load(href, name)}
              classN="playList"
              items={this.props.audio.music}
            />
          </div>

          <div className="part" id="videoPart">
            <Link className="title" to="/video">
              Video:
            </Link>
            <Video history={this.props.history} videoList={videos} />
          </div>

          <div className="del_btn">
            <Button
              onCl="btnWarn"
              onClick={() => this.props.delItem(index)}
              text="Delete Profile"
            />
          </div>
        </div>
        <div className="itemParams">
          <div className="part" id="namePart">
            <div className="name">{value.name}</div>
            {value.status ? (
              <div className="statusItem online">Online</div>
            ) : (
              <div className="statusItem offline">Offline</div>
            )}
          </div>
          <div className="part" id="mainPart">
            <div className="title">Personal information</div>
            {Object.keys(valueParams).map(
              (keyOf, index) =>
                valueParams[keyOf] ? (
                  <div key={index} className="param">
                    <b className="paramLabel">{keyOf + ':'}</b>
                    <span>{valueParams[keyOf]}</span>
                  </div>
                ) : (
                  ''
                )
            )}
          </div>
          <Link className="btnUpdate" to={`/profiles/${index}/update`}>
            Update Profile
          </Link>
        </div>
      </div>
    )
  }
}
