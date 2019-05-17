import * as tslib_1 from "tslib";
import React from 'react';
import Button from './Button';
import List from './List';
import { Link } from 'react-router-dom';
import Video from './Video';
import * as actions from '../store/Audio/actionsAudio';
import Pictures from './Pictures';
var ItemInfo = /** @class */ (function (_super) {
    tslib_1.__extends(ItemInfo, _super);
    function ItemInfo(props) {
        var _this = _super.call(this, props) || this;
        _this.load = function (index) {
            var dispatch = _this.props.dispatch;
            dispatch(actions.load(index));
        };
        return _this;
    }
    ItemInfo.prototype.render = function () {
        var _this = this;
        var value = this.props.item;
        var valueParams = {
            age: value.age,
            gender: value.gender,
            country: value.country,
            city: value.city,
            email: value.email,
        };
        var index = this.props.idItem;
        var allVideo = this.props.video;
        var keysVid = Object.keys(allVideo);
        if (keysVid.length > 3) {
            var videos = [];
            for (var i = 0; i < 4; i++) {
                if (keysVid[i]) {
                    videos[keysVid[i]] = allVideo[keysVid[i]];
                }
            }
        }
        else {
            var allVideo_1 = this.props.video;
            var keysVid_1 = Object.keys(allVideo_1);
            var videos = [];
            for (var i = 0; i < 2; i++) {
                if (keysVid_1[i]) {
                    videos[keysVid_1[i]] = allVideo_1[keysVid_1[i]];
                }
            }
        }
        return (React.createElement("div", { id: "itemInfo" },
            React.createElement("div", { className: "itemContent" },
                React.createElement("div", { className: "part", id: "imagePart" },
                    React.createElement("div", { className: "itemImage" },
                        React.createElement("img", { src: value.picture
                                ? value.picture
                                : require('../images/profile.png') }))),
                React.createElement("div", { className: "part", id: "imagesPart" },
                    React.createElement(Link, { className: "title", to: "/pictures" }, "Pictures:"),
                    React.createElement("div", { className: "picturesItem" },
                        React.createElement(Pictures, { history: this.props.history, rowsValue: 0, images: this.props.pictures, choose: function (select) {
                                return _this.props.setPicture(select, _this.props.idUser);
                            } }))),
                React.createElement("div", { className: "part", id: "audioPart" },
                    React.createElement(Link, { className: "title", to: "/audio" }, "Audio:"),
                    React.createElement(List, { classValue: "audioList", title: "Playlist", playing: this.props.audio.playing ? this.props.audio.src : false, onChoose: function (href, name) { return _this.load(href, name); }, classN: "playList", items: this.props.audio.music })),
                React.createElement("div", { className: "part", id: "videoPart" },
                    React.createElement(Link, { className: "title", to: "/video" }, "Video:"),
                    React.createElement(Video, { history: this.props.history, videoList: videos })),
                React.createElement("div", { className: "del_btn" },
                    React.createElement(Button, { onCl: "btnWarn", onClick: function () { return _this.props.delItem(index); }, text: "Delete Profile" }))),
            React.createElement("div", { className: "itemParams" },
                React.createElement("div", { className: "part", id: "namePart" },
                    React.createElement("div", { className: "name" }, value.name),
                    value.status ? (React.createElement("div", { className: "statusItem online" }, "Online")) : (React.createElement("div", { className: "statusItem offline" }, "Offline"))),
                React.createElement("div", { className: "part", id: "mainPart" },
                    React.createElement("div", { className: "title" }, "Personal information"),
                    Object.keys(valueParams).map(function (keyOf, index) {
                        return valueParams[keyOf] ? (React.createElement("div", { key: index, className: "param" },
                            React.createElement("b", { className: "paramLabel" }, keyOf + ':'),
                            React.createElement("span", null, valueParams[keyOf]))) : ('');
                    })),
                React.createElement(Link, { className: "btnUpdate", to: "/profiles/" + index + "/update" }, "Update Profile"))));
    };
    return ItemInfo;
}(React.Component));
export default ItemInfo;
