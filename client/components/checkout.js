import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateUser } from '../store/user'
import { closeCart } from '../store/productReducer'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      ccNumber: '',
      ccSecurity: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    const input = evt.target.name
    this.setState({
      [input]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.closeOpenCart(this.props.location.state.cartId)

  }

  render() {
    return <div>
      <div>Total Due: {this.props.location.state.total}</div>
      <form onSubmit={this.handleSubmit}>
        <div>
          <div className="form-field">
            <div className="form-div">
              <label>First Name</label>
            </div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-field">
            <div className="form-div">
              <label>Last Name</label>

            </div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-field">
            <div className="form-div">
              <label>Address</label>

            </div>
            <input
              type="text"
              name="address"
              placeholder="shipping address"
              value={this.state.address}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-field">
            <div className="form-div">
              <label>Email</label>

            </div>
            <input
              type="text"
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-field">
            <div className="form-div">
              <label>Credit Card Number</label>

            </div>
            <input
              type="text"
              name="ccNumber"
              placeholder="0000 0000 0000 0000"
              value={this.state.ccNumber}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-field">
            <div className="form-div">
              <label>Security Code</label>

            </div>
            <input
              type="text"
              name="ccSecurity"
              placeholder="000"
              value={this.state.ccSecurity}
              onChange={this.handleChange}
            />
          </div>

          <hr />
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  closeOpenCart: (cartId) => {
    dispatch(closeCart(cartId)).then(() => {
      ownProps.history.push('/products')
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
