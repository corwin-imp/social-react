import * as tslib_1 from "tslib";
import React from 'react';
import Input from './Input';
import Button from './Button';
var AddVideo = /** @class */ (function (_super) {
    tslib_1.__extends(AddVideo, _super);
    function AddVideo(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            name: '',
            src: '',
        };
        _this.onName = _this.onName.bind(_this);
        _this.onSrc = _this.onSrc.bind(_this);
        return _this;
    }
    AddVideo.prototype.onName = function (event) {
        this.setState({
            name: event.target.value,
        });
    };
    AddVideo.prototype.onSrc = function (event) {
        this.setState({
            src: event.target.value,
        });
    };
    AddVideo.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "part addVideo" },
            React.createElement("div", { className: "title" }, "Add video"),
            React.createElement("form", { className: "form-inline", role: "form" },
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { htmlFor: "labelVideo" }, "Label video: "),
                    React.createElement(Input, { id: "labelVideo", type: "text", onChange: this.onName, value: this.state.name }),
                    React.createElement("label", { htmlFor: "src" }, "Src:"),
                    React.createElement(Input, { id: "src", type: "text", onChange: this.onSrc, value: this.state.src })),
                React.createElement(Button, { onCl: "btnAdd", onClick: function () { return _this.props.addVideo(_this.state); }, text: "Add" }))));
    };
    return AddVideo;
}(React.Component));
export default AddVideo;
