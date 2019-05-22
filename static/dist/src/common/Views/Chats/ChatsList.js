var _this = this;
import * as tslib_1 from "tslib";
import { List, ListItem } from '@material-ui/core';
import moment from 'moment';
import * as React from 'react';
import { useState, useMemo } from 'react';
import styled from 'styled-components';
var Container = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  height: calc(100% - 56px);\n  overflow-y: overlay;\n"], ["\n  height: calc(100% - 56px);\n  overflow-y: overlay;\n"])));
var StyledList = styled(List)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  padding: 0 !important;\n"], ["\n  padding: 0 !important;\n"])));
var StyledListItem = styled(ListItem)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  height: 76px;\n  padding: 0 15px;\n  display: flex;\n"], ["\n  height: 76px;\n  padding: 0 15px;\n  display: flex;\n"])));
var ChatPicture = styled.img(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  height: 50px;\n  width: 50px;\n  object-fit: cover;\n  border-radius: 50%;\n"], ["\n  height: 50px;\n  width: 50px;\n  object-fit: cover;\n  border-radius: 50%;\n"])));
var ChatInfo = styled.div(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n  width: calc(100% - 60px);\n  height: 46px;\n  padding: 15px 0;\n  margin-left: 10px;\n  border-bottom: 0.5px solid silver;\n  position: relative;\n"], ["\n  width: calc(100% - 60px);\n  height: 46px;\n  padding: 15px 0;\n  margin-left: 10px;\n  border-bottom: 0.5px solid silver;\n  position: relative;\n"])));
var ChatName = styled.div(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n  margin-top: 5px;\n"], ["\n  margin-top: 5px;\n"])));
var MessageContent = styled.div(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n  color: gray;\n  font-size: 15px;\n  margin-top: 5px;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n"], ["\n  color: gray;\n  font-size: 15px;\n  margin-top: 5px;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n"])));
var MessageDate = styled.div(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  color: gray;\n  top: 20px;\n  right: 0;\n  font-size: 13px;\n"], ["\n  position: absolute;\n  color: gray;\n  top: 20px;\n  right: 0;\n  font-size: 13px;\n"])));
var getChatsQuery = "\n  query GetChats {\n    chats {\n      id\n      name\n      picture\n      lastMessage {\n        id\n        content\n        createdAt\n        isMine\n      }\n    }\n  }\n";
var ChatsList = function () {
    var _a = useState([]), chats = _a[0], setChats = _a[1];
    useMemo(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var body, chats;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(process.env.REACT_APP_SERVER_URL + "/graphql", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ query: getChatsQuery }),
                    })];
                case 1:
                    body = _a.sent();
                    return [4 /*yield*/, body.json()];
                case 2:
                    chats = (_a.sent()).data.chats;
                    setChats(chats);
                    return [2 /*return*/];
            }
        });
    }); }, [true]);
    console.log('renderC');
    return (React.createElement(Container, null,
        React.createElement(StyledList, null, chats.map(function (chat) { return (React.createElement(StyledListItem, { key: chat.id, button: true },
            React.createElement(ChatPicture, { src: chat.picture }),
            React.createElement(ChatInfo, null,
                React.createElement(ChatName, null, chat.name),
                chat.lastMessage && (React.createElement(React.Fragment, null,
                    React.createElement(MessageContent, null, chat.lastMessage.content),
                    React.createElement(MessageDate, null, moment(chat.lastMessage.createdAt).format('HH:mm'))))))); }))));
};
export default ChatsList;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
