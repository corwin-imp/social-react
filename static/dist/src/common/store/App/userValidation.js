import * as tslib_1 from "tslib";
import { LOAD_USERVALIDATION, LOAD_USERVALIDATION_SUCCESS, LOAD_USERVALIDATION_FAIL, } from '../Chat/TypesChat';
var initialState = {
    loaded: false,
    data: [],
};
export default function userValidation(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case LOAD_USERVALIDATION:
            return tslib_1.__assign({}, state, { loading: true });
        case LOAD_USERVALIDATION_SUCCESS:
            return tslib_1.__assign({}, state, { loading: false, loaded: true, data: action.json });
        case LOAD_USERVALIDATION_FAIL:
            return tslib_1.__assign({}, state, { loading: false, loaded: false, error: action.error, data: state.data.slice() });
        default:
            return state;
    }
}
