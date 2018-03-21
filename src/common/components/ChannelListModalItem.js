import React, { PropTypes } from 'react'
import classnames from 'classnames'

const ChannelListModalItem = props => {
  const { channel: selectedChannel, onClick, channel } = props
  return (
    <button
      className={classnames({ selected: channel === selectedChannel })}
      style={{ cursor: 'hand', color: 'black' }}
      onClick={() => onClick(channel)}
    >
      <li style={{ cursor: 'pointer' }}>
        <h5>{channel.name}</h5>
      </li>
    </button>
  )
}

ChannelListModalItem.propTypes = {
  channel: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ChannelListModalItem
