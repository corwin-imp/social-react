import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MessageComposer from './MessageComposer'
import MessageListItem from './MessageListItem'
import Channels from './Channels'
import ItemsList from './ItemsList'
import FontAwesome from 'react-fontawesome'
import * as actions from '../store/Chat/actions'
import * as authActions from '../store/Auth/actionsAuth'
import TypingListItem from './TypingListItem'
import uuid from 'node-uuid'
import {
  Modal,
  DropdownButton,
  MenuItem,
  Button,
  Input,
  Navbar,
  NavDropdown,
  Nav,
  NavItem,
} from 'react-bootstrap'

export default class Chat extends Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    channels: PropTypes.array.isRequired,
    activeChannel: PropTypes.object.isRequired,
    typers: PropTypes.array.isRequired,
    socket: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      privateChannelModal: false,
      targetedUser: '',
      findUser: '',
      selectItem: [],
      find: true,
    }
  }

  componentDidMount() {
    const { socket, user, dispatch, channels } = this.props

    if (!channels.length && user.id) {
      dispatch(actions.fetchMyChannels(user.channels))
    }
    socket.emit('chat mounted', user)
    socket.on('new bc message', msg => dispatch(actions.receiveRawMessage(msg)))

    socket.on('typing bc', user => dispatch(actions.typing(user)))
    socket.on('stop typing bc', user => dispatch(actions.stopTyping(user)))
    socket.on('new channel', channel =>
      dispatch(actions.receiveRawChannel(channel))
    )

    socket.on('receive socket', socketID => {
      dispatch(authActions.receiveSocket(socketID))
    })
    socket.on('receive private channel', channel =>
      dispatch(actions.receiveRawChannel(channel))
    )
  }

  componentDidUpdate() {
    const messageList = this.refs.messageList
    messageList.scrollTop = messageList.scrollHeight
  }

  handleChange(event) {
    this.setState({ findUser: event.target.value })
  }

  selectItem(event, data) {
    event.preventDefault()
    let item = this.state.selectItem
    item[data.dataId] = data.name

    this.setState({
      selectItem: item,
    })
    event.currentTarget.classList.toggle('itemSelect')
  }

  createChannel(event) {
    const { dispatch, channels, socket, user } = this.props
    event.preventDefault()

    /*   if (this.state.selectItem.length > 0 && channels.filter(channel => {
                return channel.between === this.state.selectItem;
            }).length < 1) {

        }*/

    let arrChannels = this.state.selectItem

    let ids = Object.keys(arrChannels)
    let names = Object.values(arrChannels)
    ids.push(user.id)
    names.push(user.name)
    names = names.join(',')

    for(let chan in channels ){


        if(duplicat(ids, channels[chan]['between'])){
          console.log('dubl ',ids, channels[chan]['between']);
          this.setState({
            find: true,
            selectItem: [],
          });
          alert('channel exists!');

          return false
        }

    }


    const newChannel = {
      //  name: `channel  ${channels.length + 1 }`,
      name: names,
      id: `${Date.now()}${uuid.v4()}`,
      private: false,
      between: ids,
    }
    dispatch(actions.createChannel(newChannel))
    this.changeActiveChannel(newChannel)
    this.setState({
      find: true,
      selectItem: [],
    })
    socket.emit('new channel', newChannel)
  }

  onFocus(event) {
    if (event.currentTarget.classList == 'form-control') {
      this.setState({ find: false })
    }
  }

  onClFind(event) {
    console.log('onClFind-------------------------------')
    this.setState({ find: true })
  }

  handleSave(newMessage) {
    const { dispatch } = this.props
    if (newMessage.text.length !== 0) {
      dispatch(actions.createMessage(newMessage))
    }
  }

  handleSignOut() {
    const { dispatch } = this.props
    dispatch(authActions.signOut())
  }

  changeActiveChannel(channel) {
    const { socket, activeChannel, dispatch } = this.props
    socket.emit('leave channel', activeChannel)
    socket.emit('join channel', channel)
    dispatch(actions.changeChannel(channel))
    dispatch(actions.fetchMessages(channel.name))
  }

  handleClickOnUser(user) {
    this.setState({ privateChannelModal: true, targetedUser: user })
  }

  closePrivateChannelModal(event) {
    event.preventDefault()
    this.setState({ privateChannelModal: false })
  }

  handleSendDirectMessage() {
    const { dispatch, socket, channels, user } = this.props
    const doesPrivateChannelExist = channels.filter(item => {
      return (
        item.name ===
        (`${this.state.targetedUser.username}+${user.username}` ||
          `${user.username}+${this.state.targetedUser.username}`)
      )
    })
    if (
      user.username !== this.state.targetedUser.username &&
      doesPrivateChannelExist.length === 0
    ) {
      const newChannel = {
        name: `${this.state.targetedUser.username}+${user.username}`,
        id: Date.now(),
        private: true,
        between: [this.state.targetedUser.username, user.username],
      }
      dispatch(actions.createChannel(newChannel))
      this.changeActiveChannel(newChannel)
      socket.emit(
        'new private channel',
        this.state.targetedUser.socketID,
        newChannel
      )
    }
    if (doesPrivateChannelExist.length > 0) {
      this.changeActiveChannel(doesPrivateChannelExist[0])
    }
    this.setState({ privateChannelModal: false, targetedUser: '' })
  }

  render() {
    const {
      messages,
      socket,
      channels,
      activeChannel,
      typers,
      dispatch,
      user,
      screenWidth,
    } = this.props
    let idActive = activeChannel.id

    const filteredMessages = messages.filter(
      message => message.channelID === activeChannel.name
    )
    const username = this.props.user.username
    var re = new RegExp(`,${username}`, 'g')
    let channelName = activeChannel.name.replace(re, '')
    const dropDownMenu = (
      <div
        style={{
          width: '21rem',
          top: '0',
          alignSelf: 'baseline',
          padding: '0',
          margin: '0',
          order: '1',
        }}
      >
        <DropdownButton
          key={1}
          style={{ width: '21rem' }}
          id="user-menu"
          bsSize="large"
          bsStyle="primary"
          title={username}
        >
          <MenuItem
            style={{ width: '21rem' }}
            eventKey="4"
            onSelect={this.handleSignOut}
          >
            Sign out
          </MenuItem>
        </DropdownButton>
      </div>
    )
    const PrivateMessageModal = (
      <div>
        <Modal
          bsSize="small"
          key={1}
          show={this.state.privateChannelModal}
          onHide={this.closePrivateChannelModal}
        >
          <Modal.Header>{this.state.targetedUser.username}</Modal.Header>
          <Modal.Body>
            <Button onClick={this.handleSendDirectMessage.bind(this)}>
              Direct Message
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closePrivateChannelModal.bind(this)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
    const mobileNav = (
      <Navbar fixedTop style={{ background: '#337ab7', color: 'white' }}>
        <span style={{ fontSize: '2em' }}>{username}</span>
        <Navbar.Toggle />
        <Navbar.Collapse style={{ maxHeight: '100%' }}>
          <Button bsStyle="primary" onSelect={this.handleSignOut}>
            {' '}
            Sign out
          </Button>
          <section style={{ order: '2', marginTop: '1.5em' }}>
            <Channels
              socket={socket}
              onClick={this.changeActiveChannel}
              channels={channels}
              messages={messages}
              dispatch={dispatch}
            />
          </section>
        </Navbar.Collapse>
      </Navbar>
    )
    const bigNav = (
      <div className="part rightSide navChat">
        <div className="stickyPart">
          <div className="searchCont">
            <FontAwesome
              className="super-crazy-colors"
              name="search"
              size="lg"
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
            <Input
              ref="friendName"
              type="text"
              hasFeedback
              name="friendName"
              onFocus={this.onFocus}
              autoFocus={false}
              placeholder="Find"
              value={this.state.findUser}
              onChange={this.handleChange}
            />
          </div>

          {!this.state.find ? (
            <section className="itemsSection">
              <ItemsList
                selectItem={this.selectItem}
                items={this.props.items}
              />
              <Button
                className="btnAdd"
                onClick={this.createChannel}
                type="button"
              >
                Messages
              </Button>
            </section>
          ) : (
            <Channels
              idActive={idActive}
              username={username}
              socket={socket}
              onClick={this.changeActiveChannel}
              channels={channels}
              messages={messages}
              dispatch={dispatch}
            />
          )}
        </div>
      </div>
    )
    return (
      <div
        id="pageChat"
        style={{
          margin: '0',
          padding: '0',
          height: '100%',
          width: '100%',
          display: '-webkit-box',
        }}
      >
        <div onClick={this.onClFind} className="part mainPart mainChat">
          <div className="title">{channelName}</div>
          {PrivateMessageModal}
          <ul
            style={{
              wordWrap: 'break-word',
              margin: '0',
              overflowY: 'auto',
              padding: '0',
              paddingBottom: '1em',
              flexGrow: '1',
              order: '1',
            }}
            ref="messageList"
          >
            {filteredMessages.map(message => (
              <MessageListItem
                handleClickOnUser={this.handleClickOnUser}
                message={message}
                key={message.id}
              />
            ))}
          </ul>
          <MessageComposer
            socket={socket}
            activeChannel={activeChannel.name}
            user={user}
            onSave={this.handleSave}
          />

          <footer>
            {typers.length === 1 && (
              <div>
                <span>
                  <TypingListItem username={typers[0]} key={1} />
                  <span> is typing</span>
                </span>
              </div>
            )}
            {typers.length === 2 && (
              <div>
                <span>
                  <TypingListItem username={typers[0]} key={1} />
                  <span> and </span>
                  <TypingListItem username={typers[1]} key={2} />
                  <span> are typing</span>
                </span>
              </div>
            )}
            {typers.length > 2 && (
              <div>
                <span>Several people are typing</span>
              </div>
            )}
          </footer>
        </div>
        {screenWidth < 500 ? mobileNav : bigNav}
      </div>
    )
  }
}

function duplicat(b, c) {
  for (var d = [], e = {},a = 0; a < b.length; a++) e[b[a]]? e[b[a]]++:e[b[a]]=1 ;
  for (a = 0; a < c.length; a++) e[c[a]] && d.push(c[a]) && e[c[a]]--;
  return d.length == b.length && c.length == b.length
};

