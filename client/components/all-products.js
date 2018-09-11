'use strict'
import React, { Component } from 'React'
import { connect } from 'react-redux'
import  { getProducts }  from '../store/productReducer'

const mapStateToProps = (state) => ({
  products: state.products
})

// const mapDispatchToProps = (dispatch) => ({
//   getProducts: () => dispatch(getProducts())

// })

// class AllProducts extends Component {

//   componentDidMount () {
//    this.props.getProducts()
//    console.log('here', this.props)
//   }

// render () {

export const AllProducts = props => {

  // const {products} = props

return (

  <div className="container">
    <h1> All Products</h1>
  <ul className="tile">
    {
     props.products.products.map(product => (

        <li key={product.id}>
        {product.name}
        <a className="tile" href={`/products/${product.id}`} >
        <img src={product.imageUrl} width="100" height="100"/>
        </a>
        </li>
      ))
    }
  </ul>


  </div>

  )
}

export default connect(mapStateToProps)(AllProducts)

// export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
