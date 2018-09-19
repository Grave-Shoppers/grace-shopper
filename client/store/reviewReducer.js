import axios from 'axios'

//ACTION TYPES
const ADD_REVIEW = 'ADD_REVIEW'
const GOT_REVIEWS = 'GOT_REVIEWS'
const GOT_REVIEW = 'GOT_REVIEW'

//ACTION CREATORS
export const addReview = content => ({ type: ADD_REVIEW, content })

export const gotReviews = reviews => ({ type: GOT_REVIEWS, reviews })

export const gotReview = review => ({ type: GOT_REVIEW, review })

//THUNKS
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

export const getReviews = productId => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/products/${productId}/review`)
      const data = response.data
      const action = gotReviews(data)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}

//REDUCER

const initialState = {
  newReview: { stars: 1, content: '' },
  reviews: []
}

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REVIEW: {
      return { ...state, newReview: action.content }
    }
    case GOT_REVIEWS: {
      return { ...state, reviews: action.reviews }
    }
    default:
      return state
  }
}

export default reviewReducer
