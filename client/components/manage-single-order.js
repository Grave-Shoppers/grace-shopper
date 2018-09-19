import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchOrder, fetchSingleOrderAdmin } from '../store/orders'
import { Link, Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import axios from 'axios'

const initialState = {
  status: '',
  products: {},
}

class SingleOrder extends Component {
  constructor() {
    super()
    this.state = { ...initialState }
    this.handleOrderStatusChange = this.handleOrderStatusChange.bind.this
    this.handleSubmit = this.handleSubmit.this
  }

  async componentDidMount() {
    const orderId = this.props.match.params.id
    const res = await axios.get(`/api/orders/all/${orderId}`)
    const order = res.data
    this.setState(order)
  }

  calculateTotal() {
    const products = this.state[0].products
    let total = 0
    for (let i = 0; i < products.length; i++) {
      total = total + (products[i].cartProducts.quantity * (products[i].price / 100))
    }
    return Math.floor(total * 100) / 100
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const updatedOrder = this.state
    const orderId = this.props.match.params.id
    this.props.fetchSingleOrderAdmin(updatedOrder, orderId)
  }

  handleOrderStatusChange(evt) {
    this.setState({
      status: evt.target.value
    }
    )
  }

  render() {
    if (!this.state[0]) {
      return (
        <div><h2>Loading....</h2></div>
      )
    }
    const orderId = this.props.match.params.id
    const order = this.state[0]
    const products = this.state[0].products
    return (
      <div>
        <h2>Your Order</h2>
        <h4>Order #: {orderId} </h4>
        <h4>Order Status: {order.status.toUpperCase()}</h4>
        <h4>Order Details:</h4>
        {
          products.map(product => {
            return (
              <ul key={product.id}>
                <div key={product.id}>
                  <li>{product.name}</li>
                  <li>Quantity: {product.cartProducts.quantity}</li>
                  <li>Price: ${product.price / 100}</li>
                  <li>Total Amount: ${(product.price * product.cartProducts.quantity) / 100}</li>
                </div>
              </ul>
            )
          })
        }
        <h4>Total: ${this.calculateTotal()}</h4>

        <form onSubmit={this.handleSubmit}>
          <div>
            <div>
              <label>Change Order Status</label>
            </div>
            <select defaultValue={order.status.toUpperCase()} onChange={this.handleOrderStatusChange}>
              <option>open</option>
              <option>processing</option>
              <option>cancelled</option>
              <option>completed</option>
            </select>
          </div>
          <hr />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default SingleOrder
