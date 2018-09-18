import axios from 'axios'


const ADD_REVIEW = 'ADD_REVIEW'


export const addedReview = review => ({ type: ADD_REVIEW, review })


export const addReview = (stars, content, productId) => {
  return async dispatch => {
    const response = await axios.post(`/api/products/${productId}/review`)
    const data = response.data
    const action = addedReview(data)
    dispatch(action)
  }
}

const initialState = {
  products: [],
  selectedProduct: {},
  review: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_REVIEW: {
      return { ...state, review: [...state, action.review] }
    }
    default:
      return state
  }
}
