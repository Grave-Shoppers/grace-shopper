import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { CartProducts } from '../server/db/models'
import { getCart, removeFromCart } from '../store/productReducer-irene'

const mapStateToProps = (state) => ({
  products: state.products,
  loaded: state.loaded
})

const mapDispatchToProps = (dispatch) => ({
  getInitialProducts: () => {
    dispatch(getCart())
  },
  removeProductFromCart: (productId) => {
    dispatch(removeFromCart(productId))
  }
})

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    }
    this.removeProduct = this.removeProduct.bind(this)
  }

  componentDidMount() {
    console.log('our component mounted!')
    this.props.getInitialProducts()
  }

  removeProduct(productId) {
    this.props.removeProductFromCart(productId)
  }

  render() {
    return <div>
      <button type="submit" productId="1" onClick={() => { this.removeProduct(1) }}>Delete</button>
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
