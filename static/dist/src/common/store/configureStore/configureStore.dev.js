import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from '../../middleware/promiseMiddleware';
import DevTools from '../../containers/DevTools';
import thunk from 'redux-thunk';
import rootReducer from '../RootReducer';
var finalCreateStore = compose(applyMiddleware(thunk, promiseMiddleware), DevTools.instrument())(createStore);
function configureStore(initialState) {
    var store = finalCreateStore(rootReducer, initialState);
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../RootReducer', function () {
            var nextRootReducer = require('../RootReducer');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
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
