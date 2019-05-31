import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../store/Profile/actionsProfile'
import Audio from '../components/Audio'
import {Dispatch} from "redux";
import {AppState} from '../store/RootReducer'

type Props = {
  dispatch: Dispatch,
  audio: any,
  music: any,
  location: any,

}


class AppAudio extends React.Component<Props> {
  constructor(props: Props) {
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

const mapStateToProps = (state:AppState) => {
  return {
    audio: state.audio,
    music: state.files.music,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    delAudio: (id: any, idBase: any) => actions.delItem(id, idBase, dispatch),
    dispatch: dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppAudio)
