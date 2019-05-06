import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import promiseMiddleware from '../../middleware/promiseMiddleware'
import DevTools from '../../containers/DevTools'
import thunk from 'redux-thunk'
import rootReducer from '../RootReducer'

const finalCreateStore = compose(
  applyMiddleware(thunk, promiseMiddleware),
  DevTools.instrument()
)(createStore)

function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../RootReducer', () => {
      const nextRootReducer = require('../RootReducer')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

const initialState = {
  auth: {
    user: {
      username: 'tester123',
      id: 0,
      socketID: null,
    },
  },
}
export default configureStore(initialState)
