import React from 'react';
import PropTypes from 'prop-types';
var TypingListItem = function (props) {
    var username = props.username;
    return React.createElement("span", null, username);
};
TypingListItem.proptypes = {
    username: PropTypes.string.isRequired,
};
export default TypingListItem;
