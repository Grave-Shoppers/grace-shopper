'use strict'
import React from 'React'
import { connect } from 'react-redux'

export const SingleProduct = (props) => {

  console.log('we out here')
  const productId = Number(props.match.params.id)
  console.log('props', props)
  console.log('params id', props.match.params.id)
  console.log('HELLO')

  const selectedProduct = props.products.products.find((product) => product.id === productId);


  console.log('selected product', selectedProduct)

    if(!props.products.loaded) return <h1>Loading...</h1>

    return (

    <div>
      <h1>HELLO</h1>

          <img src={selectedProduct.imageUrl} width="100" height="100"/>

          <div>Price: {selectedProduct.price}</div>
          <div>Description: {selectedProduct.description}</div>
    </div>
    )
}

const mapStateToProps = state => ({
  products: state.products
})


export default connect(mapStateToProps)(SingleProduct)
