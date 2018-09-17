import axios from 'axios'

const GET_ORDER = 'GET_ORDER'
const GET_ORDERS = 'GET_ORDERS'

const allOrders = {}

const getOrder = order => ({type: GET_ORDER, order})
const getOrders = orders => ({type: GET_ORDERS, orders})

export const fetchOrders = () => async dispatch => {
  try {
    const res = await axios.get('/api/user/orders')
    dispatch(getOrders(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchOrder = () => async dispatch => {
  try {
    const res = await axios.get('/api/user/orders/:id')
    dispatch(getOrder(res.data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = allOrders, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    case GET_ORDER:
      return action.order
    default:
      return state
  }
}
