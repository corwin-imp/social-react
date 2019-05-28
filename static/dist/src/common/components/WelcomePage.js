"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const react_router_dom_1 = require("react-router-dom");
const actionsApp_1 = require("../store/App/actionsApp");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
class WelcomePage extends react_1.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: '',
        };
    }
    componentDidMount() {
        this.usernameInput.focus();
    }
    handleChange(event) {
        if (event.target.name === 'username') {
            this.setState({ username: event.target.value });
        }
    }
    handleSubmit() {
        const { dispatch } = this.props;
        const username = this.state.username;
        dispatch(actionsApp_1.welcomePage(username));
        this.setState({ username: '' });
    }
    render() {
        const { screenWidth } = this.props;
        /*if(screenWidth < 500) {
             return (
             <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
             <header style={{textAlign: 'center'}}>
    
             </header>
             <main>
             <form>
             <Input
             style={{height: '2.7em', fontSize: '1.3em', width: '100%'}}
             ref="usernameInput"
             type="text"
             name="username"
             value={this.state.username}
             placeholder="Enter username"
             onChange={this.handleChange}
             />
             <Link to="/signup">
             <Button
             bsStyle="success"
             style={{width: '100%'}}
             type="submit"
             onClick={this.handleSubmit}>
             <p style={{margin: '0', padding: '0', fontSize: '1.5em'}}>Sign Up</p>
             </Button>
             </Link>
             </form>
             <p style={{margin: '1em', textAlign: 'center'}}>Or</p>
             <Link to="/signin">
             <Button style={{width: '100%'}} bsStyle="default" >Sign in</Button>
             </Link>
             </main>
             </div>
             );
             }*/
        return (react_1.default.createElement("div", { className: "autoPages part" },
            react_1.default.createElement("header", { style: {
                    display: 'flex',
                    justifyContent: 'center',
                    flexGrow: '0',
                    order: '0',
                } }, "Sign Up to Social"),
            react_1.default.createElement("main", { style: { display: 'flex', justifyContent: 'center' } },
                react_1.default.createElement("form", { style: { display: 'flex', justifyContent: 'center' } },
                    react_1.default.createElement("div", { style: { margin: 'auto', paddingRight: '0.2em', height: '3.5em' } },
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { style: { height: '2.7em', fontSize: '1.3em' }, ref: (ref) => this.usernameInput = ref, type: "text", name: "username", value: this.state.username, placeholder: "Enter username", onChange: this.handleChange })),
                    react_1.default.createElement("section", { style: { margin: 'auto', width: '12em', height: '3.5em' } },
                        react_1.default.createElement(react_router_dom_1.Link, { to: "/signup" },
                            react_1.default.createElement(react_bootstrap_1.Button, { className: "btnAuto", variant: "success", type: "submit", onClick: this.handleSubmit },
                                react_1.default.createElement("p", { style: { margin: '0', padding: '0', fontSize: '1.5em' } }, "Sign Up"))))),
                react_1.default.createElement("div", { style: {
                        height: '3.5em',
                        width: '12em',
                        alignSelf: 'center',
                        display: 'flex',
                        marginLeft: '1em',
                    } },
                    react_1.default.createElement("p", { style: { marginRight: '1em', marginTop: '1em' } }, " Or "),
                    react_1.default.createElement(react_router_dom_1.Link, { to: "/signin" },
                        react_1.default.createElement(react_bootstrap_1.Button, { style: { margin: 'auto', height: '3.5em' }, variant: "default" }, "Sign in"))))));
    }
}
WelcomePage.propTypes = {
    dispatch: prop_types_1.default.func.isRequired,
};
function mapStateToProps(state) {
    return {
        screenWidth: state.environment.screenWidth,
    };
}
exports.default = react_redux_1.connect(mapStateToProps)(WelcomePage);
