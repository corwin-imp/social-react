"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const ChannelListItem = props => {
    const { channel: selectedChannel, ondelete, onClick, channel, username, idActive, } = props;
    var re = new RegExp(`,${username}`, 'g');
    let channelName = channel.name.replace(re, '');
    let active = idActive == channel.id ? 'ChannelAct' : '';
    return (react_1.default.createElement("div", { className: `${active} channelItem` },
        react_1.default.createElement("a", { onClick: () => onClick(channel), className: classnames_1.default({ selected: channel === selectedChannel }), style: { cursor: 'hand', color: 'white' } },
            react_1.default.createElement("div", { style: { textAlign: 'left', cursor: 'pointer', marginLeft: '2em' } },
                react_1.default.createElement("h5", null, channelName))),
        react_1.default.createElement("div", { onClick: () => ondelete(channel), className: "deleteBtn" }, "x")));
};
ChannelListItem.propTypes = {
    channel: prop_types_1.default.object.isRequired,
    onClick: prop_types_1.default.func.isRequired,
};
exports.default = ChannelListItem;
