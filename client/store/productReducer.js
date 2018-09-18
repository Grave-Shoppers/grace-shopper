import axios from 'axios';
//ieieieieie
//action types
const GOT_PRODUCTS = 'GOT_PRODUCTS';
const GOT_PRODUCT = 'GOT_PRODUCT';
const ADDED_TO_CART = 'ADDED_TO_CART'
const GOT_CART = 'GOT_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const CHANGE_CART_QUANTITY = 'CHANGE_CART_QUANTITY'
const CLOSE_CART = 'CLOSE_CART'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'

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
export const gotCart = (products) => {
	return { type: GOT_CART, products }
}
export const addCart = (product) => ({ type: ADD_TO_CART, product })
export const removedFromCart = (products) => ({ type: REMOVE_FROM_CART, products })
export const changedCartQuantity = () => ({ type: CHANGE_CART_QUANTITY })
export const closedCart = () => {
	return ({ type: CLOSE_CART })
}
export const updatedProduct = (updatedProduct, productId) => ({ type: UPDATE_PRODUCT, updatedProduct, productId })
export const addedNewProduct = (newProduct) => ({ type: ADD_PRODUCT, newProduct })

//thunks

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


export const addToCart = (productId) => {
	return async (dispatch) => {
		try {
			const id = Number(productId)
			const response = await axios.post(`/api/cart/${id}`)

			dispatch(addToCart(response.data))
		} catch (err) {
			console.error(err)
		}
	}
}

export const getCart = () => {
	return async (dispatch) => {
		try {
			const cart = await axios.get('/api/cart')
			if (cart.data[0]) {
				const cartId = cart.data[0].id
				const response = await axios.get(`/api/cart/${cartId}`)
				const data = response.data
				const products = data[0].products
				dispatch(gotCart(products))
			}
		} catch (err) {
			console.error(err)
		}
	}
}

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

export const changeCartQuantity = (productId, quantity) => {
	return async (dispatch) => {
		try {
			const response = await axios.put(`/api/cart/${productId}`, { quantity })
			dispatch(changedCartQuantity())
		} catch (err) {
			console.error(err)
		}
	}
}

export const closeCart = (cartId) => {
	return async (dispatch) => {
		try {
			console.log('got into close cart thunk')
			const response = await axios.put(`/api/cart/${cartId}/closed`, { status: 'processing' })
			dispatch(closedCart())
		} catch (err) {
			console.error(err)
		}
	}
}

export const updateProduct = (payload, productId) => {
	return async (dispatch) => {
		try {
			const response = await axios.put(`/api/products/${productId}`, { ...payload })
			const editedProduct = response.data
			dispatch(updatedProduct(editedProduct, productId))
		} catch (err) {
			console.error(err)
		}
	}
}

export const addNewProduct = (payload) => {
	return async (dispatch) => {
		try {
			const response = await axios.post('/api/products', { ...payload })
			const newProduct = response.data
			dispatch(addedNewProduct(newProduct))
		} catch (err) {
			console.error(err)
		}
	}
}

//--------reducer
const initialState = {
	products: [],
	loaded: false,
	cart: [],
	selectedProduct: { imageUrl: '', name: '', price: '', id: '', quantity: '' },
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
			return { ...state, cart: action.products, loaded: true }
		}
		case ADD_TO_CART: {
			return { ...state, toAdd: action.product }
		}
		case ADDED_TO_CART: {
			return { ...state, toAdd: [] }
		}
		case REMOVE_FROM_CART: {
			return { ...state, cart: [...action.products] }
		}
		case CHANGE_CART_QUANTITY: {
			return { ...state }
		}
		case CLOSE_CART: {
			return { ...state }
		}
		case ADD_PRODUCT: {
			return { ...state, products: [...state.products, action.newProduct] }
		}
		default:
			return state;
	}
};

export default products;
