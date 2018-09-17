import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const Navbar = ({ handleClick, isLoggedIn, firstName }) => (
  <div>
    <nav>
      {/* <h1>GRAVE HOPPER</h1> */}
      {isLoggedIn ? (
        <div className="navbar">
          {/* The navbar will show these links after you log in */}
          <ul>
            <a>Welcome {firstName}!</a>
            <Link to="/home">Home</Link>
            <Link to="/products">All Products</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">Previous Orders</Link>
            <a href="#" onClick={handleClick}>Logout</a>
          </ul>
        </div>
      ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/">Home</Link>
            <Link to="/login">Login or Sign-Up</Link>
            <Link to="/products">All Products</Link>
            <Link to="/cart">Cart</Link>
          </div>
        )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    firstName: state.user.firstName
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
