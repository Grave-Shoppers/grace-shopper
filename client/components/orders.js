import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../store/orders'
import { Link } from 'react-router-dom'

const mapStateToProps = state => ({
  orders: state.orders.orders
})

const mapDispatchToProps = dispatch => ({
  fetchInitialOrders: () => dispatch(fetchOrders())
})

class Orders extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchInitialOrders()
    console.log("order comp mount")
  }

  render() {
    const orders = this.props.orders

    return (
      <div>
        <h2>Your Past Orders</h2>
        <div>
          {
            orders.map(order => {
              return (
                <ul key={order.id}>
                  <div key={order.id}>
                    <h4>Order #: {order.id}</h4>
                    <h5>Date: {new Date(order.createdAt).toDateString()}</h5>
                    <h5>Order Status: {order.status.toUpperCase()}</h5>
                    <Link to={`/orders/${order.id}`}>View Order Details</Link>
                  </div>
                  <br />
                </ul>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
