import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ItemInfo from './../components/ItemInfo'
import * as actions from '../store/Profile/actionsProfile'
import * as authActions from '../store/Auth/actionsAuth'

class AppItem extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { audio, video, pictures, dispatch,music } = this.props
    if (!pictures.length) {
      dispatch(actions.getFiles('get-pictures'))
    }
    if (!music.length) {
      dispatch(actions.getFiles('get-music'))
    }
    if (!Object.keys(video).length) {
      dispatch(actions.getVideo())
    }
  }

  render() {
    const {audio} = this.props;
    audio['music'] =  this.props.music;
    let id = this.props.params.index

    if (!this.props.item) {
      return false
    }
    return (
      <div className="profile" id="pageProfile">
        <ItemInfo
          item={this.props.item}
          history={this.props.history}
          idItem={id}
          delItem={this.props.delItem}
          idUser={this.props.idUser}
          video={this.props.video}
          audio={audio}
          pictures={this.props.pictures}
          setPicture={this.props.setPicture}
          src={this.props.src}
          dispatch={this.props.dispatch}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    state: state.reducerItems,
    item: state.reducerItems.item,
    pictures: state.files.pictures,
    audio: state.audio,
    music: state.files.music,
    video: state.reducerVideo.video,
    idUser: state.auth.user.id,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  dispatch(actions.getItem(props.params.index))

  return {
    delItem: idBase => dispatch(actions.delItem(idBase)),
    setPicture: (picture, id) => authActions.setPicture(picture, id, dispatch),
    dispatch: dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppItem)
