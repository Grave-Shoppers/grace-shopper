import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Login, Signup, AllProducts, Category, SingleProduct, Cart, Checkout, Home, Orders, SingleOrder, ManageProduct, ManageSingleProduct, AddProduct, ManageOrders, ManageSingleOrder, AdminUsers } from './components'
import { me } from './store'
import { getProducts, getCart } from './store/productReducer'
import { fetchOrders } from './store/orders'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/products/category/:category" component={Category} />
        <Route exact path="/products" component={AllProducts} />
        <Route path="/products/:singleId" component={SingleProduct} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route exact path="/" component={Home} />
        <Route exact path="/orders" component={Orders} />
        <Route exact path="/orders/:id" component={SingleOrder} />
        <Route exact path="/manageProduct" component={ManageProduct} />
        <Route path="/addProduct" component={AddProduct} />
        <Route path="/manageProduct/:id" component={ManageSingleProduct} />
        <Route exact path="/manageOrders" component={ManageOrders} />
        <Route path="/manageOrders/:id" component={ManageSingleOrder} />
        <Route path="/manageUser" component={AdminUsers} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/" component={Home} />
          </Switch>
        )}
        {/* Displays our HomePage component as a fallback */}
        <Route component={Home} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(getProducts())
      dispatch(getCart())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
