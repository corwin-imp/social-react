"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@material-ui/core");
const moment_1 = tslib_1.__importDefault(require("moment"));
const React = tslib_1.__importStar(require("react"));
const react_1 = require("react");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const Container = styled_components_1.default.div `
  height: calc(100% - 56px);
  overflow-y: overlay;
`;
const StyledList = styled_components_1.default(core_1.List) `
  padding: 0 !important;
`;
const StyledListItem = styled_components_1.default(core_1.ListItem) `
  height: 76px;
  padding: 0 15px;
  display: flex;
`;
const ChatPicture = styled_components_1.default.img `
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%;
`;
const ChatInfo = styled_components_1.default.div `
  width: calc(100% - 60px);
  height: 46px;
  padding: 15px 0;
  margin-left: 10px;
  border-bottom: 0.5px solid silver;
  position: relative;
`;
const ChatName = styled_components_1.default.div `
  margin-top: 5px;
`;
const MessageContent = styled_components_1.default.div `
  color: gray;
  font-size: 15px;
  margin-top: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
const MessageDate = styled_components_1.default.div `
  position: absolute;
  color: gray;
  top: 20px;
  right: 0;
  font-size: 13px;
`;
const getChatsQuery = `
  query GetChats {
    chats {
      id
      name
      picture
      lastMessage {
        id
        content
        createdAt
        isMine
      }
    }
  }
`;
const ChatsList = () => {
    const [chats, setChats] = react_1.useState([]);
    react_1.useMemo(async () => {
        const body = await fetch(`${process.env.REACT_APP_SERVER_URL}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: getChatsQuery }),
        });
        const { data: { chats } } = await body.json();
        setChats(chats);
    }, [true]);
    console.log('renderC');
    return (React.createElement(Container, null,
        React.createElement(StyledList, null, chats.map((chat) => (React.createElement(StyledListItem, { key: chat.id, button: true },
            React.createElement(ChatPicture, { src: chat.picture }),
            React.createElement(ChatInfo, null,
                React.createElement(ChatName, null, chat.name),
                chat.lastMessage && (React.createElement(React.Fragment, null,
                    React.createElement(MessageContent, null, chat.lastMessage.content),
                    React.createElement(MessageDate, null, moment_1.default(chat.lastMessage.createdAt).format('HH:mm')))))))))));
};
exports.default = ChatsList;
