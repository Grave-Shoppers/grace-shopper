import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { CartProducts } from '../server/db/models'
import { Link, Route } from 'react-router-dom'
import { getCart, removeFromCart, changeCartQuantity } from '../store/productReducer'

const mapStateToProps = (state) => {
  return {
    cart: state.products.cart,
    loaded: state.products.loaded
  }
}

const mapDispatchToProps = (dispatch) => ({
  getInitialProducts: () => {
    dispatch(getCart())
  },
  removeProductFromCart: (productId) => {
    dispatch(removeFromCart(productId))
  },
  changeQuantity: (productId, quantity) => {
    dispatch(changeCartQuantity(productId, quantity))
  }
})

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      total: 0,
      cartId: 0
    }
    this.removeProduct = this.removeProduct.bind(this)
    this.createQuantity = this.createQuantity.bind(this)
    this.handlePickQuantity = this.handlePickQuantity.bind(this)
    this.calculateTotal = this.calculateTotal.bind(this)
  }

  componentDidMount() {
    console.log('our component mounted!')
    this.props.getInitialProducts()
  }

  removeProduct(productId) {
    this.props.removeProductFromCart(productId)
  }

  createQuantity(product, cart) {
    let dropDown = []
    let options = []
    let quantity
    if (product.quantity >= 10) {
      quantity = 10;
    } else {
      quantity = product.quantity
    }
    for (let i = 1; i <= quantity; i++) {
      options.push(<option key={i} value={i}>{i}</option>)
    }
    dropDown.push(options)
    return options
  }

  handlePickQuantity(evt) {
    const id = Number(evt.target.getAttribute("productid"))
    const quantity = Number(evt.target.value)
    this.props.changeQuantity(id, quantity)
    this.props.getInitialProducts()
  }

  calculateTotal() {
    const cart = this.props.cart
    let total = 0
    for (let i = 0; i < cart.length; i++) {
      total = total + (cart[i].cartProducts.quantity * (cart[i].price / 100))
    }
    return (Math.floor(total * 100) / 100).toFixed(2)
  }

  render() {
    const cart = this.props.cart
    return (
      <div>
        {
          this.props.loaded
            ? <div>
              {
                cart.length > 0
                  ? <div>
                    <h2 className="cart-header">Your Cart</h2>
                    <div className="cart-container">
                      {
                        cart.map(product => (
                          <div className="cart-item-container" key={product.id}>
                            <div>{product.name}</div>
                            <label>
                              QTY
                            <select defaultValue={product.cartProducts.quantity} productid={product.id} onChange={this.handlePickQuantity}>
                                {
                                  this.createQuantity(product, cart)
                                }
                              </select>
                            </label>
                            <img src={product.imageUrl} width={150} />
                            <div>{`Unit Price: $${product.price / 100}`}</div>
                            <div>{`Price for Item: $${Math.floor(((product.price / 100) * product.cartProducts.quantity) * 100) / 100}`}</div>
                            <button type="submit" productid={product.id} onClick={() => {
                              this.removeProduct(product.id)
                              this.props.getInitialProducts()
                            }}>Remove From Cart</button>
                          </div>
                        ))
                      }
                      <div id="total">Total: ${this.calculateTotal()}</div>
                      <Link id="checkout-button" to={{ pathname: "/checkout", state: { total: this.calculateTotal(), cartId: cart[0].cartProducts.cartId } }}>Check Out</Link>
                      {/* <button type="submit">Check Out</button> */}
                    </div>
                  </div>
                  : <div>Your Cart Is Empty</div>
              }
            </div>
            : <div>Loading Your Cart</div>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
