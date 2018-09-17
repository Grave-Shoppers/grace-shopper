import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { CartProducts } from '../server/db/models'
import { Link } from 'react-router-dom'
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
      total: 0
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
    return total
  }

  render() {
    const cart = this.props.cart
    return <div>
      {
        this.props.loaded
          ? <div>
            <div>Your Cart</div>
            {
              cart.map(product => (
                <div key={product.id}>
                  <select defaultValue={product.cartProducts.quantity} productid={product.id} onChange={this.handlePickQuantity}>
                    {
                      this.createQuantity(product, cart)
                    }
                  </select>
                  <div>{product.name}</div>
                  <img src={product.imageUrl} width={250} />
                  <div>{`Unit Price: $${product.price / 100}`}</div>
                  <div>{`Price for Item: $${(product.price / 100) * product.cartProducts.quantity}`}</div>
                  <button type="submit" productid={product.id} onClick={() => {
                    this.removeProduct(product.id)
                    this.props.getInitialProducts()
                  }}>Remove From Cart</button>
                </div>
              ))
            }
            <div>Total: {this.calculateTotal()}</div>
            <Link to={{ pathname: "/checkout", state: { total: this.calculateTotal() } }}>Check Out</Link>
            {/* <button type="submit">Check Out</button> */}
          </div>
          : <div>Loading Your Cart</div>
      }

    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
