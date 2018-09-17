import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Login, Signup, AllProducts, Category, SingleProduct, Cart, Checkout, Home } from './components'
import { me } from './store'
import { getProducts, getCart } from './store/productReducer'

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
        <Route exact path="/products" component={AllProducts} />
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/" component={Home} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={Home} />
            {/* put route for previous orders here */}
          </Switch>
        )}
        {/* {isAdmin && (
          <Switch>
            {/* Routes placed here are only available after logging in as an admin */}
        {/* <Route path="/home" component={Home} /> */}
        {/* put route for all orders - possibly want to to have open orders & closed orders & have ability to change the status*/}
        {/* put route for inventory where admins can update /*}
          {/* </Switch> */}
        {/* )} */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    products: state.products
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
