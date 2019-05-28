"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const actions = tslib_1.__importStar(require("../store/Chat/actions"));
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const Chat_1 = tslib_1.__importDefault(require("../components/Chat"));
const react_redux_1 = require("react-redux");
const socket_io_client_1 = tslib_1.__importDefault(require("socket.io-client"));
const socket = socket_io_client_1.default('', { path: '/api/chat' });
const initialChannel = 'Lobby'; // NOTE: I hard coded this value for my example.  Change this as you see fit
class ChatContainer extends react_1.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { dispatch, channels, user } = this.props;
        if (!channels) {
            dispatch(actions.fetchMessages(initialChannel));
        }
    }
    render() {
        if (!this.props.user.id) {
            return react_1.default.createElement("div", { className: "part" }, "First you need to sign In to Social");
        }
        return react_1.default.createElement(Chat_1.default, Object.assign({}, this.props, { socket: socket }));
    }
}
ChatContainer.propTypes = {
    messages: prop_types_1.default.array.isRequired,
    user: prop_types_1.default.object.isRequired,
    dispatch: prop_types_1.default.func.isRequired,
    channels: prop_types_1.default.array.isRequired,
    activeChannel: prop_types_1.default.object.isRequired,
    typers: prop_types_1.default.array.isRequired,
};
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
    };
}
exports.default = react_redux_1.connect(mapStateToProps)(ChatContainer);
