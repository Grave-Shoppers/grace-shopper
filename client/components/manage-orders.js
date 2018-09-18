import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllOrders } from '../store/orders'
import { Link, Route } from 'react-router-dom'
import { withRouter } from 'react-router'

const mapStateToProps = state => ({
  orders: state.orders.orders
})

const mapDispatchToProps = dispatch => ({
  fetchAllInitialOrders: () => dispatch(fetchAllOrders())
})

class Orders extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchAllInitialOrders()
    console.log("order comp mount")
  }

  render() {
    const orders = this.props.orders
    console.log("props in orders " + this.props)
    console.log("orders: " + orders)

    return(
      <div>
        <h2>All Orders</h2>
        <div>
          {
            orders.map(order => {
              return (
                <ul key={order.id}>
                  <div key={order.id}>
                    <h4>Order #: {order.id}</h4>
                    <h5>Date: {new Date(order.createdAt).toDateString()}</h5>
                    <h5>Order Status: {order.status.toUpperCase()}</h5>
                    <Link to={`/manageOrders/${order.id}`}>View Order Details</Link>
                  </div>
                  <br/>
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
