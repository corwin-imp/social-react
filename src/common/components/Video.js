import React from 'react'
import Button from './Button'
import Switcher from './Switcher'
import Choose from './choose'
import List from './List'

import store from '../store/configureStore/configureStore'
import ReactPlayer from 'react-player'
export default class Video extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      playing: false,
      url: null,
      loaded: false,
      loop: false,
      name: '',
      progress: 0,
      in_set_progress_mode: false,
      mute: false,
      volume: 1.0,
    }
    // this.history = [];
  }

  handleToggle() {
    this.setState({
      playing: !this.state.playing,
    })
  }

  onPlay = () => {
    this.setState({ playing: true })
  }
  render() {
    let { videoList } = this.props
    let value = this.props.item
    let idItem = Number(this.props.idItem)
    const {
      url,
      playing,
      volume,
      muted,
      loop,
      played,
      loaded,
      duration,
      playbackRate,
    } = this.state

    if (!videoList) {
      return false
    }
    return (
      <div className="videoList">
        {Object.keys(videoList).map((keyOf, index) => (
          <div className="video" key={index}>
            <ReactPlayer
              ref={this.ref}
              className="react-player"
              width="100%"
              height="100%"
              url={videoList[keyOf].href}
              controls={true}
              playing={playing}
              loop={loop}
              playbackRate={playbackRate}
              volume={volume}
              muted={muted}
              onReady={() => console.log('onReady')}
              onStart={() => console.log('onStart')}
              onBuffer={() => console.log('onBuffer')}
              onSeek={e => console.log('onSeek', e)}
              onEnded={this.onEnded}
              onError={e => console.log('onError', e)}
              onProgress={this.onProgress}
              onDuration={this.onDuration}
            />
            {this.props.delVideo ? (
              <div className="btnVideo">
                <Button
                  onCl="btnWarn"
                  onClick={() => this.props.delVideo(keyOf)}
                  text="Delete"
                />
              </div>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    )
  }
}
