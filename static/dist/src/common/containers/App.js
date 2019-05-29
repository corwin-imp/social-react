"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const history_1 = require("../services/history");
const actionsApp_1 = require("../store/App/actionsApp");
const react_redux_1 = require("react-redux");
const actionsAuth_1 = require("../store/Auth/actionsAuth");
const authActions = tslib_1.__importStar(require("../store/Auth/actionsAuth"));
const actionsD = tslib_1.__importStar(require("../store/Profile/actionsProfile"));
const Search_1 = tslib_1.__importDefault(require("../components/Search"));
const react_bootstrap_1 = require("react-bootstrap");
const Audio_1 = tslib_1.__importDefault(require("../components/Audio"));
const react_fontawesome_1 = tslib_1.__importDefault(require("react-fontawesome"));
class App extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        };
    }
    onSearch(event) {
        this.setState({
            gender: event.target.value,
        });
    }
    componentDidMount() {
        const { dispatch, user, location } = this.props;
        if (!user.id) {
            dispatch(actionsAuth_1.receiveAuth());
        }
        else {
            if (location.pathname == '/') {
                history_1.browserHistory.push('/my-profile');
            }
        }
        if (!this.props.music.length) {
            dispatch(actionsD.getFiles('get-music'));
        }
        dispatch(actionsApp_1.initEnvironment());
        actionsD.getItems(dispatch);
    }
    handleSignOut() {
        const { dispatch } = this.props;
        dispatch(authActions.signOut());
    }
    render() {
        const { user, location, audio } = this.props;
        audio['music'] = this.props.music;
        const username = this.props.user.username;
        const { screenHeight, isMobile, screenWidth } = this.props.environment;
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
        const dropDownMenu = (react_1.default.createElement("div", { className: "myProfile" },
            react_1.default.createElement(react_router_dom_1.Link, { id: "personLink", to: "/my-profile" },
                ' ',
                react_1.default.createElement(react_fontawesome_1.default, { className: "super-crazy-colors", name: "chess-rook", size: "lg", style: { textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' } })),
            react_1.default.createElement(react_bootstrap_1.DropdownButton, { key: 1, style: { width: '21rem' }, id: "user-menu", title: username },
                react_1.default.createElement(react_bootstrap_1.Dropdown.Item, { style: { width: '21rem' }, eventKey: "4", onSelect: this.handleSignOut }, "Signout"))));
        if (isMobile) {
            return (react_1.default.createElement("div", { style: { height: `${screenHeight}px`, width: `${screenWidth}px` } }, (this.props.items.size) && this.props.children));
        }
        return (react_1.default.createElement("div", { id: "mainApp" },
            react_1.default.createElement("header", { id: "headApp" },
                react_1.default.createElement("div", { className: "topItem", id: "headAppLinks" },
                    user.id ? (dropDownMenu) : (react_1.default.createElement(react_router_dom_1.Link, { className: "autoLink", to: "/" }, "Auto")),
                    (location.pathname != '/profiles') &&
                        react_1.default.createElement(Search_1.default, { dispatch: this.props.dispatch, fullSearch: false, userId: this.props.user.id })),
                react_1.default.createElement("div", { className: "topItem", id: "headAppAudio" },
                    react_1.default.createElement(Audio_1.default, { path: location.pathname, top: true, audio: audio, dispatch: this.props.dispatch }))),
            react_1.default.createElement("div", { id: "contentApp" },
                react_1.default.createElement("aside", { id: "sideApp" },
                    react_1.default.createElement("ul", { className: "sideAppNav" },
                        react_1.default.createElement("li", null,
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/profiles" }, "Profiles")),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/audio" }, "Audio")),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/video" }, "Video")),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/pictures" }, "Pictures")),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/chat" }, "Chat")))),
                react_1.default.createElement("div", { id: "AppContent" }, (this.props.items.size) ? this.props.children : ''))));
    }
}
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
exports.default = react_redux_1.connect(mapStateToProps)(App);
