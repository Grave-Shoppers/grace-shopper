'use strict'
import React from 'React'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  products: state.products
})

export const AllProducts = props => {

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

