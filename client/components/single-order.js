import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchOrder } from '../store/orders'
import { Link, Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import axios from 'axios'

class SingleOrder extends Component {
  constructor() {
    super()
    this.state = { order: {} }
  }

  async componentDidMount() {
    const orderId = this.props.match.params.id
    const res = await axios.get(`/api/orders/${orderId}`)
    const order = res.data
    this.setState(order)
  }

  calculateTotal() {
    const products = this.state[0].products
    let total = 0
    for (let i=0; i < products.length; i++) {
      total = total + (products[i].cartProducts.quantity * (products[i].price / 100))
    }
    return Math.floor(total*100)/100
  }

  render() {
    if(!this.state[0]){
      return (
        <div><h2>Loading....</h2></div>
      )
    }
    const orderId = this.props.match.params.id
    console.log(this.state[0])
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
                  <li>Price: ${product.price/100}</li>
                  <li>Total Amount: ${(product.price*product.cartProducts.quantity)/100}</li>
                </div>
              </ul>
            )
          })
        }
        <h4>Total: ${this.calculateTotal()}</h4>
      </div>
    )
  }
}

export default SingleOrder
