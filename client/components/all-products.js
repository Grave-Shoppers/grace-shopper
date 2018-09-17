'use strict';
import React, { Component } from 'React';
import { connect } from 'react-redux';
import { getProducts, addToCart } from '../store/productReducer';
import { Link, Route, Switch } from 'react-router-dom'
import { Category } from './category'

const mapStateToProps = (state) => ({
  products: state.products,
  selectedProduct: state.selectedProduct
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getProducts()),
  addToCart: (selectedProduct) => dispatch(addToCart(selectedProduct))
});

class AllProducts extends Component {
  constructor() {
    super();
    this.state = {
      selectedProduct: {
        id: ''
      }
    }
    this.addProducts = this.addProduct.bind(this)
  }
  componentDidMount() {
    this.props.getProducts();
  }
  addProduct(id) {
    // this.setState({
    //   selectedProduct: {
    //     // imageUrl: imageUrl,
    //     // name: name,
    //     // price: price,
    //     id: id
    //     // quantity: quantity
    //   }
    // });
    this.props.addToCart(id)
  }



  render() {
    // const productId = Number(this.state.selectedProduct.id)
    // if (productId !== 0 || productId !== NaN) {
    //   this.props.addToCart(productId)
    // }
    return (
      <div className="wrapper">
        <div id="left" className="column">
          <div className="top-left">
            <h2>View by Category</h2>

          </div>
          <div className="bottom">
            <ul>
              <li>
                <Link to="/products/costume">Costumes</Link>
              </li>
              <li>
                <Link to="/products/pet-costume">Pet Costumes</Link>
              </li>
              <li>
                <Link to="/products/candy">Candy</Link>
              </li>
              <li>
                <Link to="/products/decoration">Decoration</Link>
              </li>
              <Switch>
                <Route path="/products/:category" component={Category} />
              </Switch>
            </ul>
          </div>
        </div>

        <div id="right" className="column">
          <div className="top-right">
            <h1> All Products</h1>
          </div>
          <div className="parent">
            <div className="bottom">

              {this.props.products.products.map((product) => (
                <div className="child" key={product.id}>
                  <a className="child" href={`/products/${product.id}`}>
                    <img src={product.imageUrl} width="100" height="100" />
                  </a>
                  <div> {product.name} </div>
                  <div>Price: ${product.price / 100}</div>
                  <div>Description: {product.description}</div>
                  <button type="button" onClick={() => {
                    this.addProduct(product.id)
                  }}
                    className="btn btn-primary btn-sm">
                    Add to Cart
							</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
