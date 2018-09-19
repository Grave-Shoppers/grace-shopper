'use strict'
import React, { Component } from 'React'
import { connect } from 'react-redux'
import { addToCart, getProducts } from '../store/productReducer'


const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts()),
  addToCart: (selectedProduct) => dispatch(addToCart(selectedProduct))
})

class Category extends Component {
  constructor() {
    super()
    this.state = {
      selectedProduct: {
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
      selectedProduct: {
        id: id
      }
    })
    this.props.addToCart(id)
  }

  render() {

    const category = this.props.match.params.category

    const selectedCategory = this.props.products.products.filter(
      product => product.category === category
    )
    if (selectedCategory) {

      return (
        <div className="wrapper">
          <div className="column">
            <h1>{category}</h1>
            <div className="parent">
              {selectedCategory.map(product => (
                <div className="child" key={product.id}>
                  <a className="child" href={`/products/${product.id}`}>
                    <img src={product.imageUrl} width="100" height="100" />
                  </a>
                  <div> {product.name} </div>
                  <div>Price: ${Math.floor(product.price) / 100}</div>
                  <div>Description: {product.description}</div>
                  <button
                    type="button"
                    onClick={() => this.addProduct(product.id)}
                    className="btn btn-primary btn-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
