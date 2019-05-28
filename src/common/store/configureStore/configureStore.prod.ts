import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../RootReducer'
import thunk from 'redux-thunk'
import promiseMiddleware from '../../middleware/promiseMiddleware'

const finalCreateStore = compose(applyMiddleware(thunk, promiseMiddleware))(
  createStore
)

function configureStore(initialState: Object = {}) {
  return finalCreateStore(rootReducer, initialState)
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