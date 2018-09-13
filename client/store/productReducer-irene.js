import axios from 'axios';

//action types
const GOT_PRODUCTS = 'GOT_PRODUCTS';
const GOT_PRODUCT = 'GOT_PRODUCT';
const ADDED_TO_CART = 'ADDED_TO_CART'
const GOT_CART = 'GOT_CART'
const ADD_TO_CART = 'ADD_TO_CART'
//irene created
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

//action creators
export const gotProducts = (products) => ({
  type: GOT_PRODUCTS,
  products
});

export const gotProduct = (product) => ({
  type: GOT_PRODUCT,
  product
});

export const addedToCart = () => ({ type: ADDED_TO_CART })
export const gotCart = (products) => ({ type: GOT_CART, products })
export const addCart = (product) => ({ type: ADD_TO_CART, product })
//irene created
export const removedFromCart = (products) => ({ type: REMOVE_FROM_CART, products })

//thunks

//get all products
export const getProducts = () => {
  return async (dispatch) => {
    try {
      const responses = await axios.get('/api/products');
      const data = responses.data;
      const action = gotProducts(data);
      dispatch(action);
    } catch (err) {
      console.error(err);
    }
  };
};

export const addToCart = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/cart')
      dispatch(addToCart(response.data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const getCart = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/cart/:id')
      dispatch(gotCart(response.data))
    } catch (err) {
      console.error(err)
    }
  }
}
//irene created
export const removeFromCart = (productId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/api/cart/${productId}`)
      dispatch(removedFromCart(response))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = {
  products: [],
  loaded: false,
  newProduct: { name: '', price: '', imageUrl: '', description: '', quantity: '', category: '' },
  toAdd: []
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PRODUCTS: {
      return { ...state, products: action.products, loaded: true };
    }
    case GOT_PRODUCT: {
      return {
        ...state,
        products: [...state.products, action.product]
      };
    }
    case GOT_CART: {
      return { ...state, products: action.products, loaded: true }
    }
    case ADD_TO_CART: {
      return { ...state, toAdd: action.product }
    }
    case ADDED_TO_CART: {
      return { ...state, toAdd: [] }
    }
    //irene created
    case REMOVE_FROM_CART: {
      return { ...state, products: [...action.products] }
    }
    default:
      return state;
  }
};

export default products;
