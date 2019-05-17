import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
var ChannelListItem = function (props) {
    var selectedChannel = props.channel, ondelete = props.ondelete, onClick = props.onClick, channel = props.channel, username = props.username, idActive = props.idActive;
    var re = new RegExp("," + username, 'g');
    var channelName = channel.name.replace(re, '');
    var active = idActive == channel.id ? 'ChannelAct' : '';
    return (React.createElement("div", { className: active + " channelItem" },
        React.createElement("a", { onClick: function () { return onClick(channel); }, className: classnames({ selected: channel === selectedChannel }), style: { cursor: 'hand', color: 'white' } },
            React.createElement("div", { style: { textAlign: 'left', cursor: 'pointer', marginLeft: '2em' } },
                React.createElement("h5", null, channelName))),
        React.createElement("div", { onClick: function () { return ondelete(channel); }, className: "deleteBtn" }, "x")));
};
ChannelListItem.propTypes = {
    channel: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};
export default ChannelListItem;
