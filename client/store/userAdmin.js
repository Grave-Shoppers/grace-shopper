import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const GOT_USERS = 'GET_USERS'
const DELETE_USER = 'DELETE_USER'

/**
 * ACTION CREATORS
 */
export const gotUsers = users => ({ type: GOT_USERS, users })
export const getUser = user => ({ type: GET_USER, user })

export const deletedUser = userId => ({ type: DELETE_USER, userId })

/**
 * THUNK CREATORS
 */

export const getUsers = () => {
  return async dispatch => {
    try {
      const responses = await axios.get('/api/users')
      const data = responses.data
      const action = gotUsers(data)
      dispatch(action)
    } catch (err) {
      console.error(err)
    }
  }
}

export const deleteUser = userId => {
  return async dispatch => {
    try {
      const response = await axios.delete(`/api/users/${userId}`)
      const data = response.data
      const action = deletedUser(data)
      dispatch(action)
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * INITIAL STATE
 */
const initialState = {
  users: []
}

/**
 * REDUCER
 */
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USERS: {
      return { ...state, users: action.users }
    }
    case DELETE_USER: {
      return {
        ...state,
        users: [...state.users.filter(user => user.id !== action.userId)]
      }
    }
    default:
      return state
  }
}

export default userReducer
