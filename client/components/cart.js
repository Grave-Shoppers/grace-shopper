import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { CartProducts } from '../server/db/models'
import { getCart } from '../store/productReducer'

const mapStateToProps = (state) => ({
  products: state.products,
  loaded: state.loaded
})

const mapDispatchToProps = (dispatch) => ({
  getInitialProducts: () => {
    dispatch(getCart)
  }
})

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    }
  }

  componentDidMount() {
    console.log('our component mounted!')
    this.props.getInitialProducts()
  }

  render() {
    console.log(this.state)
    return (
      this.props.loaded
        ? (
          <div>
            {
              this.props.products.map(product => {
                return (<div key={product.id}>{product.name}</div>)
              })
            }
          </div>
        )
        : <div>Loading...</div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
