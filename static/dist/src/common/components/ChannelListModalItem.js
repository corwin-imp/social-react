"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const ChannelListModalItem = props => {
    const { channel: selectedChannel, onClick, channel } = props;
    return (react_1.default.createElement("button", { className: classnames_1.default({ selected: channel === selectedChannel }), style: { cursor: 'hand', color: 'black' }, onClick: () => onClick(channel) },
        react_1.default.createElement("li", { style: { cursor: 'pointer' } },
            react_1.default.createElement("h5", null, channel.name))));
};
ChannelListModalItem.propTypes = {
    channel: prop_types_1.default.object.isRequired,
    onClick: prop_types_1.default.func.isRequired,
};
exports.default = ChannelListModalItem;
