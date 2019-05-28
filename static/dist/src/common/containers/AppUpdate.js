"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_redux_1 = require("react-redux");
const ItemUpdate_1 = tslib_1.__importDefault(require("./../components/ItemUpdate"));
const actions = tslib_1.__importStar(require("../store/Profile/actionsProfile"));
class AppUpdate extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { item, params, getItem } = this.props;
        if (!item) {
            getItem(params.Chats);
        }
        else if (item.id != params.Chats) {
            getItem(params.Chats);
        }
    }
    render() {
        let id = this.props.params.Chats;
        if (this.props.item && this.props.item.id == this.props.params.Chats) {
            return (react_1.default.createElement("div", { className: "page DevicePage" },
                react_1.default.createElement(ItemUpdate_1.default, { item: this.props.item, updateItem: this.props.updateItem, history: this.props.history, idItem: id })));
        }
        else {
            return false;
        }
    }
}
const mapStateToProps = state => {
    return {
        state: state.reducerItems,
        item: state.reducerItems.item,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        delItem: idBase => actions.delItem(idBase, dispatch),
        updateItem: (data, idBase) => dispatch(actions.updateItem(data, idBase)),
        getItem: id => dispatch(actions.getItem(id)),
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AppUpdate);
