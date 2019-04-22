import React   from 'react'
import classnames from 'classnames'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
const ChannelListItem = props => {
  const {
    channel: selectedChannel,
    ondelete,
    onClick,
    channel,
    username,
    idActive,
  } = props
  var re = new RegExp(`,${username}`, 'g')
  let channelName = channel.name.replace(re, '')

  let active = idActive == channel.id ? 'ChannelAct' : ''
  return (
    <div className={`${active} channelItem`}>
      <a
        onClick={() => onClick(channel)}
        className={classnames({ selected: channel === selectedChannel })}
        style={{ cursor: 'hand', color: 'white' }}
      >
        <div
          style={{ textAlign: 'left', cursor: 'pointer', marginLeft: '2em' }}
        >
          <h5>{channelName}</h5>
        </div>
      </a>
      <div onClick={() => ondelete(channel)} className="deleteBtn">
        x
      </div>
    </div>
  )
}

ChannelListItem.propTypes = {
  channel: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ChannelListItem
