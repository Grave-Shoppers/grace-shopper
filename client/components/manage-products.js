'use strict'
import React, { Component } from 'React'
import { connect } from 'react-redux'
import { getProducts, addToCart } from '../store/productReducer'
import { Link } from 'react-router-dom'

const mapStateToProps = state => ({
  products: state.products,
  selectedProduct: state.selectedProduct
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts()),
  addToCart: selectedProduct => dispatch(addToCart(selectedProduct))
})

class ManageProducts extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    return (
      <div className="wrapper">

        <div id="right" className="column">
          <div className="top-right">
            <h1> All Products</h1>
          </div>
          <div className="parent">
            <div className="bottom">
              {this.props.products.products.map(product => (
                <div className="child" key={product.id}>
                  <a className="child" href={`/manageProduct/${product.id}`}>
                    <img src={product.imageUrl} width="100" height="100" />
                  </a>
                  <div> {product.name} </div>
                  <div>Price: ${product.price / 100}</div>
                  <div>Description: {product.description}</div>
                </div>
              ))}
            </div>
            <Link to="/addProduct">Add A New Product</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageProducts)
