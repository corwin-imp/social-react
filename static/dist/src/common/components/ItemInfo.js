"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const Button_1 = tslib_1.__importDefault(require("./Button"));
const List_1 = tslib_1.__importDefault(require("./List"));
const react_router_dom_1 = require("react-router-dom");
const Video_1 = tslib_1.__importDefault(require("./Video"));
const actions = tslib_1.__importStar(require("../store/Audio/actionsAudio"));
const Pictures_1 = tslib_1.__importDefault(require("./Pictures"));
class ItemInfo extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.load = index => {
            const { dispatch } = this.props;
            dispatch(actions.load(index));
        };
    }
    render() {
        let value = this.props.item;
        let valueParams = {
            age: value.age,
            gender: value.gender,
            country: value.country,
            city: value.city,
            email: value.email,
        };
        let index = this.props.idItem;
        let allVideo = this.props.video;
        let keysVid = Object.keys(allVideo);
        if (keysVid.length > 3) {
            var videos = [];
            for (let i = 0; i < 4; i++) {
                if (keysVid[i]) {
                    videos[keysVid[i]] = allVideo[keysVid[i]];
                }
            }
        }
        else {
            let allVideo = this.props.video;
            let keysVid = Object.keys(allVideo);
            var videos = [];
            for (let i = 0; i < 2; i++) {
                if (keysVid[i]) {
                    videos[keysVid[i]] = allVideo[keysVid[i]];
                }
            }
        }
        return (react_1.default.createElement("div", { id: "itemInfo" },
            react_1.default.createElement("div", { className: "itemContent" },
                react_1.default.createElement("div", { className: "part", id: "imagePart" },
                    react_1.default.createElement("div", { className: "itemImage" },
                        react_1.default.createElement("img", { src: value.picture
                                ? value.picture
                                : require('../images/profile.png') }))),
                react_1.default.createElement("div", { className: "part", id: "imagesPart" },
                    react_1.default.createElement(react_router_dom_1.Link, { className: "title", to: "/pictures" }, "Pictures:"),
                    react_1.default.createElement("div", { className: "picturesItem" },
                        react_1.default.createElement(Pictures_1.default, { history: this.props.history, rowsValue: 0, images: this.props.pictures, choose: select => this.props.setPicture(select, this.props.idUser) }))),
                react_1.default.createElement("div", { className: "part", id: "audioPart" },
                    react_1.default.createElement(react_router_dom_1.Link, { className: "title", to: "/audio" }, "Audio:"),
                    react_1.default.createElement(List_1.default, { classValue: "audioList", title: "Playlist", playing: this.props.audio.playing ? this.props.audio.src : false, onChoose: (href, name) => this.load(href, name), classN: "playList", items: this.props.audio.music })),
                react_1.default.createElement("div", { className: "part", id: "videoPart" },
                    react_1.default.createElement(react_router_dom_1.Link, { className: "title", to: "/video" }, "Video:"),
                    react_1.default.createElement(Video_1.default, { history: this.props.history, videoList: videos })),
                react_1.default.createElement("div", { className: "del_btn" },
                    react_1.default.createElement(Button_1.default, { onCl: "btnWarn", onClick: () => this.props.delItem(index), text: "Delete Profile" }))),
            react_1.default.createElement("div", { className: "itemParams" },
                react_1.default.createElement("div", { className: "part", id: "namePart" },
                    react_1.default.createElement("div", { className: "name" }, value.name),
                    value.status ? (react_1.default.createElement("div", { className: "statusItem online" }, "Online")) : (react_1.default.createElement("div", { className: "statusItem offline" }, "Offline"))),
                react_1.default.createElement("div", { className: "part", id: "mainPart" },
                    react_1.default.createElement("div", { className: "title" }, "Personal information"),
                    Object.keys(valueParams).map((keyOf, index) => valueParams[keyOf] ? (react_1.default.createElement("div", { key: index, className: "param" },
                        react_1.default.createElement("b", { className: "paramLabel" }, keyOf + ':'),
                        react_1.default.createElement("span", null, valueParams[keyOf]))) : (''))),
                react_1.default.createElement(react_router_dom_1.Link, { className: "btnUpdate", to: `/profiles/${index}/update` }, "Update Profile"))));
    }
}
exports.default = ItemInfo;
