/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './navbar'
export { default as UserHome } from './user-home'
export { Login } from './auth-form'
export { default as AllProducts } from './all-products'
export { default as Category } from './category'
export { default as SingleProduct } from './single-product'
export { default as Cart } from './cart'
export { default as Checkout } from './checkout'
export { default as Home } from './home'
export { default as Signup } from './signup'
export { default as Orders } from './orders'
export { default as SingleOrder } from './single-order'
export { default as ManageOrders } from './manage-orders'
export { default as ManageProduct } from './manage-products'
export { default as ManageSingleProduct } from './manage-single-product'
