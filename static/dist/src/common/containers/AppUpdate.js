import * as tslib_1 from "tslib";
import React from 'react';
import { connect } from 'react-redux';
import ItemUpdate from './../components/ItemUpdate';
import * as actions from '../store/Profile/actionsProfile';
var AppUpdate = /** @class */ (function (_super) {
    tslib_1.__extends(AppUpdate, _super);
    function AppUpdate(props) {
        return _super.call(this, props) || this;
    }
    AppUpdate.prototype.componentDidMount = function () {
        var _a = this.props, item = _a.item, params = _a.params, getItem = _a.getItem;
        if (!item) {
            getItem(params.index);
        }
        else if (item.id != params.index) {
            getItem(params.index);
        }
    };
    AppUpdate.prototype.render = function () {
        var id = this.props.params.index;
        if (this.props.item && this.props.item.id == this.props.params.index) {
            return (React.createElement("div", { className: "page DevicePage" },
                React.createElement(ItemUpdate, { item: this.props.item, updateItem: this.props.updateItem, history: this.props.history, idItem: id })));
        }
        else {
            return false;
        }
    };
    return AppUpdate;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        state: state.reducerItems,
        item: state.reducerItems.item,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        delItem: function (idBase) { return actions.delItem(idBase, dispatch); },
        updateItem: function (data, idBase) { return dispatch(actions.updateItem(data, idBase)); },
        getItem: function (id) { return dispatch(actions.getItem(id)); },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppUpdate);
