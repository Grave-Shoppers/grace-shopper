import axios from 'axios';

//action types
const GOT_PRODUCTS = 'GOT_PRODUCTS';
const GOT_PRODUCT = 'GOT_PRODUCT';

//action creators
export const gotProducts = (products) => ({
	type: GOT_PRODUCTS,
	products
});

export const gotProduct = (product) => ({
	type: GOT_PRODUCT,
	product
});

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

//get products by category
// export const getProductsByCategory = (category) => {
//   return async (dispatch) => {
//     try {
//       const responses = await axios.get('/api/)
//     } catch (err) {
//       console.error(err)
//     }
//   }
// }

//reducer

const initialState = {
	products: [],
	loaded: false,
	newProduct: { name: '', price: '', imageUrl: '', description: '', quantity: '', category: '' }
};

const products = (state = initialState, action) => {
	switch (action.type) {
		case GOT_PRODUCTS: {
			return { ...state, products: action.products, loaded: true };
		}
		case GOT_PRODUCT: {
			return {
				...state,
				products: [ ...state.products, action.product ]
			};
		}
		default:
			return state;
	}
};

export default products;
