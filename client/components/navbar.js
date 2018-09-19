import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const Navbar = ({ handleClick, isLoggedIn, firstName, isAdmin }) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div className="navbar">
          <ul>
            <a>Welcome {firstName}!</a>
            <Link to="/home">Home</Link>
            <Link to="/products">All Products</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">Previous Orders</Link>
            {isAdmin ? (
              <a>
                <Link to="/manageUser">Manage Users</Link>
                <Link to="/manageOrders">Manage Orders</Link>
                <Link to="/manageProduct">Manage Products</Link>
              </a>
            ) : <a />}
            <a href="#" onClick={handleClick}>Logout</a>
          </ul>
        </div>
      ) : (
          <div>
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


const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    firstName: state.user.firstName,
    isAdmin: state.user.isAdmin
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


Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
