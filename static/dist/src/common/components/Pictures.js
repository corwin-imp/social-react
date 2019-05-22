"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_images_1 = tslib_1.__importDefault(require("react-images"));
const aphrodite_1 = require("aphrodite");
const react_cookie_1 = tslib_1.__importDefault(require("react-cookie"));
const actionsF = tslib_1.__importStar(require("../store/Profile/actionsProfile"));
const react_dropzone_component_1 = tslib_1.__importDefault(require("react-dropzone-component"));
const react_fontawesome_1 = tslib_1.__importDefault(require("react-fontawesome"));
class Pictures extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.load = (src, name) => {
            this.setState({
                currentImage: src,
                name: name,
            });
        };
        this.ondelete = (file, index) => {
            console.log('onDelete', file);
            const { dispatch } = this.props;
            dispatch(actionsF.removeFile('pictures', `${file}`, index));
        };
        this.state = {
            name: false,
            lightboxIsOpen: false,
            currentImage: 0,
            upload: false,
            images: this.props.images,
        };
        this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
            postUrl: '/ftp/add-file',
        };
        this.djsConfig = {
            acceptedFiles: "image/*",
            autoProcessQueue: false,
            uploadMultiple: true,
            parallelUploads: 10,
            maxFiles: 10,
            addRemoveLinks: true,
        };
        this.dropzone = null;
        this.eventHandlers = {
            init: dz => this.dropzone = dz,
            successmultiple: this.completeFile.bind(this),
        };
        this.UploadZone = this.UploadZone.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.choose = this.choose.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.gotoImage = this.gotoImage.bind(this);
        this.handleClickImage = this.handleClickImage.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.ondelete = this.ondelete.bind(this);
        this.load = this.load.bind(this);
        this.user = react_cookie_1.default.load('userId');
    }
    openLightbox(index, event) {
        event.preventDefault();
        this.setState({
            currentImage: index,
            lightboxIsOpen: true,
        });
    }
    closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    }
    gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }
    gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }
    gotoImage(index) {
        this.setState({
            currentImage: index,
        });
    }
    choose(index) {
        var choosePic = this.props.images[index];
        this.props.choose(choosePic.src);
    }
    handleClickImage() {
        if (this.state.currentImage === this.props.images.length - 1)
            return;
        this.gotoNext();
    }
    renderRowsGallery() {
        const { images } = this.props;
        const { rowsValue } = this.props;
        if (!images)
            return;
        let rows = [];
        const rowsGallery = images.filter(i => true).map((obj, i) => {
            rows.push(i);
            if (rows.length > rowsValue - 1 || i > images.length - rowsValue + 1) {
                let rowD = rows;
                rows = [];
                return (react_1.default.createElement("div", { key: i, className: aphrodite_1.css(classes.rowGallery) + ' profilePicture' }, rowD.map((ob, j) => (react_1.default.createElement("div", { href: images[ob].src, className: aphrodite_1.css(classes.thumbnail, classes['rowSquare']), key: j },
                    react_1.default.createElement("img", { onClick: e => this.openLightbox(ob, e), src: images[ob].src, className: aphrodite_1.css(classes.rowSource) }),
                    react_1.default.createElement("span", { onClick: () => this.ondelete(images[ob].name, ob), className: aphrodite_1.css(classes.delete) + ' deleteBtn' },
                        react_1.default.createElement(react_fontawesome_1.default, { className: "super-crazy-colors", name: "trash", size: "lg" })))))));
            }
        });
        return (react_1.default.createElement("div", { className: aphrodite_1.css(classes.rowsGallery) + ' profilePicture' }, rowsGallery));
    }
    renderGallery() {
        const { images } = this.props;
        if (!images)
            return;
        const gallery = images.filter(i => true).map((obj, i) => {
            return (react_1.default.createElement("a", { href: obj.src, className: aphrodite_1.css(classes.thumbnail, classes['square']), key: i, onClick: e => this.openLightbox(i, e) },
                react_1.default.createElement("img", { align: "middle", src: obj.src, className: aphrodite_1.css(classes.source) })));
        });
        return (react_1.default.createElement("div", { className: aphrodite_1.css(classes.gallery) + ' profilePicture' }, gallery));
    }
    UploadZone() {
        console.log('up', this.state.upload);
        this.setState({
            upload: !this.state.upload
        });
    }
    handlePost() {
        this.dropzone.processQueue();
    }
    completeFile(file) {
        const { dispatch } = this.props;
        console.log(file);
        this.setState({
            upload: !this.state.upload
        });
        dispatch(actionsF.getFiles('get-pictures'));
    }
    render() {
        const { rowsValue } = this.props;
        if (rowsValue) {
            var pictures = this.renderRowsGallery();
        }
        else {
            var pictures = this.renderGallery();
        }
        if (this.props.images) {
            return (react_1.default.createElement("div", null,
                react_1.default.createElement("button", { onClick: this.UploadZone, className: "btn btnZone" },
                    react_1.default.createElement("span", { className: "up" }, "Upload"),
                    react_1.default.createElement(react_fontawesome_1.default, { className: "super-crazy-colors", name: "upload", size: "lg" })),
                this.state.upload && (react_1.default.createElement("div", { className: "dropZoneCont" },
                    react_1.default.createElement(react_dropzone_component_1.default, { eventHandlers: this.eventHandlers, djsConfig: this.djsConfig, config: this.componentConfig }),
                    react_1.default.createElement("button", { className: "btnUp btn", onClick: this.handlePost.bind(this) }, "Upload"))),
                pictures,
                react_1.default.createElement(react_images_1.default, { images: this.props.images, currentImage: this.state.currentImage, isOpen: this.state.lightboxIsOpen, onClickImage: this.handleClickImage, onClickNext: this.gotoNext, onChoose: this.user && this.choose, onClickPrev: this.gotoPrevious, onClickThumbnail: this.gotoImage, onClose: this.closeLightbox, showThumbnails: true, spinner: this.props.spinner, spinnerColor: this.props.spinnerColor, spinnerSize: this.props.spinnerSize, theme: this.props.theme }),
                this.state.currentImage ? (react_1.default.createElement("div", null,
                    react_1.default.createElement("b", null, "Current Picture:"),
                    react_1.default.createElement("img", { src: this.state.currentImage, alt: "" }),
                    react_1.default.createElement("span", null, "this.state.name"))) : ('')));
        }
        else {
            return false;
        }
    }
}
Pictures.displayName = 'Gallery';
const gutter = {
    small: 2,
    large: 4,
};
const classes = aphrodite_1.StyleSheet.create({
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
exports.default = Pictures;
