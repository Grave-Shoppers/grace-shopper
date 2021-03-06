import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import products from './productReducer'
import orders from './orders'
import reviewReducer from './reviewReducer'
import userReducer from './userAdmin'

const reducer = combineReducers({ user, products, orders, reviewReducer, userReducer })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './productReducer'
export * from './reviewReducer'
export * from './orders'
export * from './userAdmin'
