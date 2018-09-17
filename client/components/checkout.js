import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateUser } from '../store/user'

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
    const newUserInfo = { ...this.state }
    console.log('GOT INTO HANDLE SUBMIT')
    this.props.updateCurrentUser(newUserInfo, this.props.user.id)
  }

  render() {
    return <div>
      <div>Total Due: {this.props.location.state.total}</div>
      <form onSubmit={this.handleSubmit}>
        {/* <script
          src="https://checkout.stripe.com/checkout.js" className="stripe-button"
          data-key="pk_test_TYooMQauvdEDq54NiTphI7jx"
          data-amount="999"
          data-name="Stripe.com"
          data-description="Example charge"
          data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
          data-locale="auto"
          data-zip-code="true">
        </script> */}
        <div>
          <div className="form-field">
            <div className="form-div">
              <label>First Name</label>
              {/* <div
                className="required-text"
                hidden={this.state.name !== ''}
              >(required)
              </div> */}
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
              {/* <div
                className="required-text"
                hidden={this.state.name !== ''}
              >(required)
              </div> */}
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
              {/* <div
                className="required-text"
                hidden={this.state.address !== ''}
              >(required)
              </div> */}
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
              {/* <div
                className="required-text"
                hidden={this.state.address !== ''}
              >(required)
              </div> */}
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
              {/* <div
                className="required-text"
                hidden={this.state.address !== ''}
              >(required)
              </div> */}
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
              {/* <div
                className="required-text"
                hidden={this.state.address !== ''}
              >(required)
              </div> */}
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

const mapDispatchToProps = (dispatch) => ({
  updateCurrentUser: (info, userId) => dispatch(updateUser(info, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
