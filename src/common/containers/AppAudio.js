import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../store/Profile/actionsProfile'
import Audio from '../components/Audio'

class AppAudio extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { dispatch } = this.props
  }
  render() {
    const {audio} = this.props;
    audio['music'] =  this.props.music;
    return (
      <div id="pageAudio">
        <Audio
          top={false}
          audio={audio}
          path={this.props.location.pathname}
          dispatch={this.props.dispatch}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    audio: state.audio,
    music: state.files.music,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    delAudio: (id, idBase) => actions.delItem(id, idBase, dispatch),
    dispatch: dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppAudio)
