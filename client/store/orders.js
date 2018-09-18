import axios from 'axios'
import { combineReducers } from 'redux'

const GET_ORDER = 'GET_ORDER'
const GET_ORDERS = 'GET_ORDERS'
const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const UPDATE_ORDER = 'UPDATE_ORDER'

const getOrder = order => ({type: GET_ORDER, order})
const getOrders = orders => ({type: GET_ORDERS, orders})
const getAllOrders = orders => ({type: GET_ALL_ORDERS, orders})
const updatedOrder = (updatedOrder, orderId) => ({type: UPDATE_ORDER, updatedOrder, orderId})

export const fetchOrders = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/orders')
      dispatch(getOrders(res.data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchOrder = (orderId) => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/${orderId}`)
    dispatch(getOrder(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchAllOrders = () => async dispatch => {
  try {
    const res = await axios.get('/api/orders/all')
    dispatch(getAllOrders(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchSingleOrderAdmin = (orderId) => async dispatch => {
  try {
    const res = await axios.get(`api/orders/all/${orderId}`)
    dispatch(getOrder(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const updateOrder = (payload, orderId) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`api/all/${orderId}`, {...payload})
      dispatch(updatedOrder(response.data, orderId))
    } catch (err) {
      console.error(err)
    }
  }
}
const orderReducer = (orders = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    case GET_ALL_ORDERS:
      return action.orders
    default:
      return orders
  }
}

const singleOrderReducer = (order = {}, action) => {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    case UPDATE_ORDER:
    return {...state, }
    default:
      return order
  }
}

const rootOrdersReducer = combineReducers({
  orders: orderReducer,
  order: singleOrderReducer
})

export default rootOrdersReducer
