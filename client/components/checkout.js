import React, { Component } from 'react'


class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      total: props.location.state.total
    }
  }

  render() {
    console.log('checkout state.total', this.state.total)
    return <div>
      <div>Total Due: {this.state.total}</div>
      <form >
        <script
          src="https://checkout.stripe.com/checkout.js" className="stripe-button"
          data-key="pk_test_TYooMQauvdEDq54NiTphI7jx"
          data-amount="999"
          data-name="Stripe.com"
          data-description="Example charge"
          data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
          data-locale="auto"
          data-zip-code="true">
        </script>
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
              // onChange={this.handleChange}
              type="text"
              name="first-name"
              placeholder="First Name"
              value={this.state.firstName}
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
              // onChange={this.handleChange}
              type="text"
              name="last-name"
              placeholder="Last Name"
              value={this.state.lastName}
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
              // onChange={this.handleChange}
              type="text"
              name="address"
              placeholder="shipping address"
              value={this.state.address}
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
              // onChange={this.handleChange}
              type="text"
              name="email"
              placeholder="email"
              value={this.state.email}
            />
          </div>

          <hr />
          {/* <button disabled={this.state.firstName !== '' && this.state.address !== '' ? false : true} type="submit">Submit</button> */}
        </div>
      </form>
    </div>
  }
}

export default Checkout
