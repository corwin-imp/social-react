import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga';
import promiseMiddleware from '../../middleware/promiseMiddleware'
//import DevTools from '../../containers/DevTools'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import randomId from '../../middlewares/randomId';
import rootSaga from '../../sagas/index';
import rootReducer from '../RootReducer'

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const enhancer = composeWithDevTools({})(
    applyMiddleware(...middlewares, thunk, randomId)
);


function configureStore(initialState: Object = {}) {
  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);



  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../RootReducer', () => {
      const nextRootReducer = require('../RootReducer')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

const initialState: any = {
  auth: {
    user: {
      username: 'tester123',
      id: 0,
      socketID: null,
    },
  },
}
export default configureStore(initialState)
