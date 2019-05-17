import * as tslib_1 from "tslib";
import React from 'react';
import Lightbox from 'react-images';
import { css, StyleSheet } from 'aphrodite';
import cookie from 'react-cookie';
import * as actionsF from '../store/Profile/actionsProfile';
import DropzoneComponent from 'react-dropzone-component';
import FontAwesome from 'react-fontawesome';
var Pictures = /** @class */ (function (_super) {
    tslib_1.__extends(Pictures, _super);
    function Pictures(props) {
        var _this = _super.call(this, props) || this;
        _this.load = function (src, name) {
            _this.setState({
                currentImage: src,
                name: name,
            });
        };
        _this.ondelete = function (file, index) {
            console.log('onDelete', file);
            var dispatch = _this.props.dispatch;
            dispatch(actionsF.removeFile('pictures', "" + file, index));
        };
        _this.state = {
            name: false,
            lightboxIsOpen: false,
            currentImage: 0,
            upload: false,
            images: _this.props.images,
        };
        _this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
            postUrl: '/ftp/add-file',
        };
        _this.djsConfig = {
            acceptedFiles: "image/*",
            autoProcessQueue: false,
            uploadMultiple: true,
            parallelUploads: 10,
            maxFiles: 10,
            addRemoveLinks: true,
        };
        _this.dropzone = null;
        _this.eventHandlers = {
            init: function (dz) { return _this.dropzone = dz; },
            successmultiple: _this.completeFile.bind(_this),
        };
        _this.UploadZone = _this.UploadZone.bind(_this);
        _this.closeLightbox = _this.closeLightbox.bind(_this);
        _this.gotoNext = _this.gotoNext.bind(_this);
        _this.choose = _this.choose.bind(_this);
        _this.gotoPrevious = _this.gotoPrevious.bind(_this);
        _this.gotoImage = _this.gotoImage.bind(_this);
        _this.handleClickImage = _this.handleClickImage.bind(_this);
        _this.openLightbox = _this.openLightbox.bind(_this);
        _this.ondelete = _this.ondelete.bind(_this);
        _this.load = _this.load.bind(_this);
        _this.user = cookie.load('userId');
        return _this;
    }
    Pictures.prototype.openLightbox = function (index, event) {
        event.preventDefault();
        this.setState({
            currentImage: index,
            lightboxIsOpen: true,
        });
    };
    Pictures.prototype.closeLightbox = function () {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    };
    Pictures.prototype.gotoPrevious = function () {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    };
    Pictures.prototype.gotoNext = function () {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    };
    Pictures.prototype.gotoImage = function (index) {
        this.setState({
            currentImage: index,
        });
    };
    Pictures.prototype.choose = function (index) {
        var choosePic = this.props.images[index];
        this.props.choose(choosePic.src);
    };
    Pictures.prototype.handleClickImage = function () {
        if (this.state.currentImage === this.props.images.length - 1)
            return;
        this.gotoNext();
    };
    Pictures.prototype.renderRowsGallery = function () {
        var _this = this;
        var images = this.props.images;
        var rowsValue = this.props.rowsValue;
        if (!images)
            return;
        var rows = [];
        var rowsGallery = images.filter(function (i) { return true; }).map(function (obj, i) {
            rows.push(i);
            if (rows.length > rowsValue - 1 || i > images.length - rowsValue + 1) {
                var rowD = rows;
                rows = [];
                return (React.createElement("div", { key: i, className: css(classes.rowGallery) + ' profilePicture' }, rowD.map(function (ob, j) { return (React.createElement("div", { href: images[ob].src, className: css(classes.thumbnail, classes['rowSquare']), key: j },
                    React.createElement("img", { onClick: function (e) { return _this.openLightbox(ob, e); }, src: images[ob].src, className: css(classes.rowSource) }),
                    React.createElement("span", { onClick: function () { return _this.ondelete(images[ob].name, ob); }, className: css(classes.delete) + ' deleteBtn' },
                        React.createElement(FontAwesome, { className: "super-crazy-colors", name: "trash", size: "lg" })))); })));
            }
        });
        return (React.createElement("div", { className: css(classes.rowsGallery) + ' profilePicture' }, rowsGallery));
    };
    Pictures.prototype.renderGallery = function () {
        var _this = this;
        var images = this.props.images;
        if (!images)
            return;
        var gallery = images.filter(function (i) { return true; }).map(function (obj, i) {
            return (React.createElement("a", { href: obj.src, className: css(classes.thumbnail, classes['square']), key: i, onClick: function (e) { return _this.openLightbox(i, e); } },
                React.createElement("img", { align: "middle", src: obj.src, className: css(classes.source) })));
        });
        return (React.createElement("div", { className: css(classes.gallery) + ' profilePicture' }, gallery));
    };
    Pictures.prototype.UploadZone = function () {
        console.log('up', this.state.upload);
        this.setState({
            upload: !this.state.upload
        });
    };
    Pictures.prototype.handlePost = function () {
        this.dropzone.processQueue();
    };
    Pictures.prototype.completeFile = function (file) {
        var dispatch = this.props.dispatch;
        console.log(file);
        this.setState({
            upload: !this.state.upload
        });
        dispatch(actionsF.getFiles('get-pictures'));
    };
    Pictures.prototype.render = function () {
        var rowsValue = this.props.rowsValue;
        if (rowsValue) {
            var pictures = this.renderRowsGallery();
        }
        else {
            var pictures = this.renderGallery();
        }
        if (this.props.images) {
            return (React.createElement("div", null,
                React.createElement("button", { onClick: this.UploadZone, className: "btn btnZone" },
                    React.createElement("span", { className: "up" }, "Upload"),
                    React.createElement(FontAwesome, { className: "super-crazy-colors", name: "upload", size: "lg" })),
                this.state.upload && (React.createElement("div", { className: "dropZoneCont" },
                    React.createElement(DropzoneComponent, { eventHandlers: this.eventHandlers, djsConfig: this.djsConfig, config: this.componentConfig }),
                    React.createElement("button", { className: "btnUp btn", onClick: this.handlePost.bind(this) }, "Upload"))),
                pictures,
                React.createElement(Lightbox, { images: this.props.images, currentImage: this.state.currentImage, isOpen: this.state.lightboxIsOpen, onClickImage: this.handleClickImage, onClickNext: this.gotoNext, onChoose: this.user && this.choose, onClickPrev: this.gotoPrevious, onClickThumbnail: this.gotoImage, onClose: this.closeLightbox, showThumbnails: true, spinner: this.props.spinner, spinnerColor: this.props.spinnerColor, spinnerSize: this.props.spinnerSize, theme: this.props.theme }),
                this.state.currentImage ? (React.createElement("div", null,
                    React.createElement("b", null, "Current Picture:"),
                    React.createElement("img", { src: this.state.currentImage, alt: "" }),
                    React.createElement("span", null, "this.state.name"))) : ('')));
        }
        else {
            return false;
        }
    };
    return Pictures;
}(React.Component));
Pictures.displayName = 'Gallery';
var gutter = {
    small: 2,
    large: 4,
};
var classes = StyleSheet.create({
    gallery: {
        marginRight: -gutter.small,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '160px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '@media (min-width: 500px)': {
            marginRight: -gutter.large,
        },
    },
    delete: {
        bottom: 0,
        padding: '8px',
        lineHeight: 'auto',
        top: 'auto',
        right: 0
    },
    rowGallery: {
        marginRight: -gutter.small,
        overflow: 'hidden',
        display: 'flex',
        alignContent: 'center',
        flexDirection: 'column',
        height: '250px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '@media (min-width: 500px)': {
            marginRight: -gutter.large,
        },
    },
    rowSquare: {
        paddingBottom: 0,
        position: 'relative',
        width: 'calc(33% - 20px)',
        border: '4px solid #d1d1d1',
        margin: '10px',
        '@media (min-width: 500px)': {
            paddingBottom: 0,
        },
    },
    rowSource: {
        border: 0,
        display: 'block',
        height: 'auto',
        cursor: 'pointer',
        margin: '0 auto',
        maxWidth: '100%',
        width: '100%',
        minHeight: '250px',
    },
    // anchor
    thumbnail: {
        boxSizing: 'border-box',
        display: 'flex',
        float: 'left',
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: 0,
        paddingBottom: gutter.small,
        overflow: 'hidden',
        '@media (min-width: 500px)': {
            paddingBottom: gutter.large,
        },
    },
    // orientation
    landscape: {
        width: '30%',
    },
    square: {
        paddingBottom: 0,
        width: 'calc(50% - 10px)',
        margin: '5px',
        '@media (min-width: 500px)': {
            paddingBottom: 0,
        },
    },
    // actual <img />
    source: {
        border: 0,
        display: 'block',
        height: 'auto',
        cursor: 'pointer',
        margin: '0 auto',
        maxWidth: '100%',
        width: '100%',
        minHeight: '160px',
    },
});
export default Pictures;
