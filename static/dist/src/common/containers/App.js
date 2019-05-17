import * as tslib_1 from "tslib";
import React from 'react';
import { Link } from 'react-router-dom';
import { browserHistory } from 'react-router';
import { initEnvironment } from '../store/App/actionsApp';
import { connect } from 'react-redux';
import { receiveAuth } from '../store/Auth/actionsAuth';
import * as authActions from '../store/Auth/actionsAuth';
import * as actionsD from '../store/Profile/actionsProfile';
import Search from '../components/Search';
import { DropdownButton, Dropdown, } from 'react-bootstrap';
import Audio from '../components/Audio';
import FontAwesome from 'react-fontawesome';
var App = /** @class */ (function (_super) {
    tslib_1.__extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            search: '',
        };
        return _this;
    }
    App.prototype.onSearch = function (event) {
        this.setState({
            gender: event.target.value,
        });
    };
    App.prototype.componentDidMount = function () {
        var _a = this.props, dispatch = _a.dispatch, user = _a.user, location = _a.location;
        if (!user.id) {
            dispatch(receiveAuth());
        }
        else {
            if (location.pathname == '/') {
                browserHistory.push('/my-profile');
            }
        }
        if (!this.props.music.length) {
            dispatch(actionsD.getFiles('get-music'));
        }
        dispatch(initEnvironment());
        actionsD.getItems(dispatch);
    };
    App.prototype.handleSignOut = function () {
        var dispatch = this.props.dispatch;
        dispatch(authActions.signOut());
    };
    App.prototype.render = function () {
        var _a = this.props, user = _a.user, location = _a.location, audio = _a.audio;
        audio['music'] = this.props.music;
        var username = this.props.user.username;
        var _b = this.props.environment, screenHeight = _b.screenHeight, isMobile = _b.isMobile, screenWidth = _b.screenWidth;
        /*    const searchForm = (
              <form role="form">
                <Input
                  id="search"
                  type="text"
                  onChange={this.onSearch}
                  value={this.state.search}
                />
                <Button
                  bsStyle="success"
                  className="hidden"
                  style={{ width: '100%' }}
                  type="submit"
                  onClick={() => this.props.searchProfiles(this.state)}
                >
                  <p style={{ margin: '0', padding: '0', fontSize: '1.5em' }}>Search</p>
                </Button>
              </form>
            )*/
        var dropDownMenu = (React.createElement("div", { className: "myProfile" },
            React.createElement(Link, { id: "personLink", to: "/my-profile" },
                ' ',
                React.createElement(FontAwesome, { className: "super-crazy-colors", name: "chess-rook", size: "lg", style: { textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' } })),
            React.createElement(DropdownButton, { key: 1, style: { width: '21rem' }, id: "user-menu", title: username },
                React.createElement(Dropdown.Item, { style: { width: '21rem' }, eventKey: "4", onSelect: this.handleSignOut }, "Signout"))));
        if (isMobile) {
            return (React.createElement("div", { style: { height: screenHeight + "px", width: screenWidth + "px" } }, (this.props.items.size) && this.props.children));
        }
        return (React.createElement("div", { id: "mainApp" },
            React.createElement("header", { id: "headApp" },
                React.createElement("div", { className: "topItem", id: "headAppLinks" },
                    user.id ? (dropDownMenu) : (React.createElement(Link, { className: "autoLink", to: "/" }, "Auto")),
                    (location.pathname != '/profiles') &&
                        React.createElement(Search, { dispatch: this.props.dispatch, fullSearch: false, userId: this.props.user.id })),
                React.createElement("div", { className: "topItem", id: "headAppAudio" },
                    React.createElement(Audio, { path: location.pathname, top: true, audio: audio, dispatch: this.props.dispatch }))),
            React.createElement("div", { id: "contentApp" },
                React.createElement("aside", { id: "sideApp" },
                    React.createElement("ul", { className: "sideAppNav" },
                        React.createElement("li", null,
                            React.createElement(Link, { to: "/profiles" }, "Profiles")),
                        React.createElement("li", null,
                            React.createElement(Link, { to: "/audio" }, "Audio")),
                        React.createElement("li", null,
                            React.createElement(Link, { to: "/video" }, "Video")),
                        React.createElement("li", null,
                            React.createElement(Link, { to: "/pictures" }, "Pictures")),
                        React.createElement("li", null,
                            React.createElement(Link, { to: "/chat" }, "Chat")))),
                React.createElement("div", { id: "AppContent" }, (this.props.items.size) ? this.props.children : ''))));
    };
    return App;
}(React.Component));
function mapStateToProps(state) {
    return {
        environment: state.environment,
        user: state.auth.user,
        state: state,
        items: state.reducerItems.items,
        audio: state.audio,
        music: state.files.music,
        pictures: state.files.pictures,
    };
}
export default connect(mapStateToProps)(App);
