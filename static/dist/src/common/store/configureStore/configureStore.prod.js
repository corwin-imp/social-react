import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../RootReducer';
import thunk from 'redux-thunk';
import promiseMiddleware from '../../middleware/promiseMiddleware';
var finalCreateStore = compose(applyMiddleware(thunk, promiseMiddleware))(createStore);
function configureStore(initialState) {
    return finalCreateStore(rootReducer, initialState);
}
var initialState = {
    auth: {
        user: {
            username: 'tester123',
            id: 0,
            socketID: null,
        },
    },
};
export default configureStore(initialState);
