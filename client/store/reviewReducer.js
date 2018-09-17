import axios from 'axios'

const ADD_REVIEW = 'ADD_REVIEW'
const GET_REVIEWS = 'GET_REVIEWS'
const GOT_REVIEW = 'GOT_REVIEW'

export const addReview = content => ({type: ADD_REVIEW, content})
export const getReviews = reviews => ({type: GET_REVIEWS, reviews})
export const gotReview = review => ({type: GOT_REVIEW, review})

export const postReview = (newReview, productId) => {
  return async dispatch => {
    const response = await axios.post(
      `/api/products/${productId}/review`,
      newReview
    )
    const data = response.data
    const action = addReview(data)
    dispatch(action)
  }
}

export const getAllReviews = productId => {
  return async dispatch => {
    const response = await axios.get(`/api/products/${productId}/review`)
    const data = response.data
    const action = getReviews(data)
    dispatch(action)
  }
}

const initialState = {
  newReview: {stars: 1, content: ''},
  reviews: []
}

export default function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_REVIEW: {
      return {...state, newReview: action.content}
    }
    case GET_REVIEWS: {
      return {...state, reviews: [...state.reviews, action.reviews]}
    }
    default:
      return state
  }
}
