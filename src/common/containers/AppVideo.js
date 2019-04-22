import React, { Component } from 'react'
import Video from '../components/Video'
import AddVideo from '../components/AddVideo'
import * as actions from '../store/Profile/actionsProfile'
import { connect } from 'react-redux'
import { initEnvironment } from '../actions/actions'
class AppVideo extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { video, dispatch } = this.props
    if (!Object.keys(video).length) {
      dispatch(actions.getVideo())
    }
  }
  render() {
    return (
      <div id="pageVideo">
        <AddVideo value="Video name" addVideo={this.props.addVideo} />
        <div id="videoPart" className="part">
          <Video
            history={this.props.history}
            videoList={this.props.video}
            delVideo={this.props.delVideo}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    video: state.reducerVideo.video,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addVideo: data => actions.addVideo(data, dispatch),
    delVideo: idBase => dispatch(actions.delVideo(idBase)),
    dispatch: dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppVideo)
