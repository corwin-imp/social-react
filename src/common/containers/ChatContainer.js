import React, { Component, PropTypes } from 'react'
import * as actions from '../actions/actions'

import { receiveAuth } from '../actions/authActions'
import Chat from '../components/Chat'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import io from 'socket.io-client'

const socket = io('', { path: '/api/chat' })
const initialChannel = 'Lobby' // NOTE: I hard coded this value for my example.  Change this as you see fit

class ChatContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch, channels, user } = this.props

    if (!channels) {
      dispatch(actions.fetchMessages(initialChannel))
    }
  }

  render() {
    if (!this.props.user.id) {
      return <div className="part">First you need to sign In to Social</div>
    }

    return <Chat {...this.props} socket={socket} />
  }
}
ChatContainer.propTypes = {
  messages: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  channels: PropTypes.array.isRequired,
  activeChannel: PropTypes.object.isRequired,
  typers: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return {
    messages: state.messages.data,
    channels: state.channels.data,
    activeChannel: state.activeChannel,
    user: state.auth.user,
    state: state,
    items: state.reducerItems.items,
    typers: state.typers,
    screenWidth: state.environment.screenWidth,
  }
}

export default connect(mapStateToProps)(ChatContainer)
