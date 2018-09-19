import React, { Component } from 'React'
import { connect } from 'react-redux'
import ReviewForm from './review-form'

import { getProducts, addToCart } from '../store/productReducer'
import AllReviews from './allReviews'

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      singleProduct: {
        id: ''
      }
    }
    this.addProduct = this.addProduct.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  addProduct(id) {
    this.setState({
      singleProduct: {
        id: id
      }
    })
    this.props.addToCart(id)
  }

  render() {
    const productId = Number(this.props.match.params.singleId)
    const selectedProduct = this.props.products.products.filter(
      product => product.id === productId
    )

    if (!selectedProduct[0]) {
      return <h1>loading...</h1>
    }

    return (
      <div>
        <div>
          <h3>{selectedProduct[0].name}</h3>
        </div>
        <img src={selectedProduct[0].imageUrl} width="200" height="200" />

        <div>Price: $ {selectedProduct[0].price / 100}</div>
        <div>Description: {selectedProduct[0].description}</div>
        <button
          type="button"
          onClick={() => this.addProduct(selectedProduct[0].id)}
          className="btn btn-primary btn-sm"
        >
          Add to Cart
        </button>
        <div>
          <ReviewForm selectedProduct={selectedProduct} />
        </div>
        <div>
          <AllReviews selectedProduct={selectedProduct} />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts()),
  addToCart: selectedProduct => dispatch(addToCart(selectedProduct))
})

const mapStateToProps = state => ({
  products: state.products
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
