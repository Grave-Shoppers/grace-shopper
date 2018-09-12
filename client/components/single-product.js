'use strict'
import React from 'React'
import { connect } from 'react-redux'

export const SingleProduct = (props) => {
  const productId = Number(props.match.params.id)
  console.log('here', productId)

  const selectedProduct = props.products.products.find((product) =>
  product.id === productId);

  if (selectedProduct) {

    return (
    <div>
      <h1>{selectedProduct.name}</h1>

          <img src={selectedProduct.imageUrl} width="100" height="100"/>

          <div>Price: {selectedProduct.price}</div>
          <div>Description: {selectedProduct.description}</div>
    </div>
    )
}
}

const mapStateToProps = state => ({
  products: state.products
})

export default connect(mapStateToProps)(SingleProduct)
