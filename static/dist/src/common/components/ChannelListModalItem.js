import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
var ChannelListModalItem = function (props) {
    var selectedChannel = props.channel, onClick = props.onClick, channel = props.channel;
    return (React.createElement("button", { className: classnames({ selected: channel === selectedChannel }), style: { cursor: 'hand', color: 'black' }, onClick: function () { return onClick(channel); } },
        React.createElement("li", { style: { cursor: 'pointer' } },
            React.createElement("h5", null, channel.name))));
};
ChannelListModalItem.propTypes = {
    channel: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};
export default ChannelListModalItem;
