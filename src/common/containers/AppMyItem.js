import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ItemInfo from './../components/ItemInfo'
import * as actions from './../actions/actionsItems'

import * as authActions from '../actions/authActions'

class AppMyItem extends React.Component {
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
    if (this.props.user) {
      let userItem = this.props.user
      userItem.status = true
      return (
        <div id="pageProfile">
          <ItemInfo
            item={userItem}
            history={this.props.history}
            idItem={this.props.user.id}
            idUser={this.props.idUser}
            delItem={this.props.delItem}
            setPicture={this.props.setPicture}
            video={this.props.video}
            audio={audio}
            pictures={this.props.pictures}
            src={this.props.src}
            dispatch={this.props.dispatch}
          />
        </div>
      )
    } else {
      return false
    }
  }
}

const mapStateToProps = state => {
  return {
    state: state,
    items: state.reducerItems.items,
    user: state.auth.user,
    pictures: state.files.pictures,
    audio: state.audio,
    music: state.files.music,
    video: state.reducerVideo.video,
    idUser: state.auth.user.id,
  }
}

const mapDispatchToProps = function(dispatch, props) {
  return {
    delItem: idBase => dispatch(actions.delItem(idBase)),
    setPicture: (picture, id) => authActions.setPicture(picture, id, dispatch),
    dispatch: dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMyItem)
