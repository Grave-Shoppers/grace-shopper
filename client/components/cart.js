import React, {Component} from 'react'
import { connect } from 'react-redux'
import { CartProducts } from '../server/db/models'
import getCart from '../store/productReducer'

// const mapStateToProps = (state) => ({
//   products: state.products
// })

// const mapDispatchToProps = (dispatch) => ({
//   getInitialProducts: () => {
//     dispatch(getCart)
//   }
// })

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [{
    name: "Wonder Woman",
    price: 45.99,
    description: "Yay",
    quantity: 50,
    category: "Costume"
  }]
    }
  }

  componentDidMount() {

  }

  render() {
    console.log(this.state)
    return (
    <div>
      {
        this.state.products.map(product => {
          return (<div key={product.id}>{product.name}</div>)})
      }
    </div>
    )
  }
}

export default Cart
