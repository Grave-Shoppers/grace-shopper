'use strict'
import React from 'React'
import { connect } from 'react-redux'
import ReviewForm from './review-form'

export const SingleProduct = (props) => {

  console.log('we out here')
  const productId = Number(props.match.params.id)
  console.log('props', props)
  console.log('params id', props.match.params.id)
  console.log('HELLO')

  const selectedProduct = props.products.products.find((product) => product.id === productId);



  if (!props.products.loaded) return <h1>Loading...</h1>

  return (

    <div>
      <div>
        <h3>{selectedProduct.name}</h3>
      </div>
      <img src={selectedProduct.imageUrl} width="200" height="200" />

      <div>Price: {selectedProduct.price / 100}</div>
      <div>Description: {selectedProduct.description}</div>
      <div>
        <ReviewForm selectedProduct={selectedProduct} />
      </div>
    </div>

  )
}

const mapStateToProps = state => ({
  products: state.products
})


export default connect(mapStateToProps)(SingleProduct)
