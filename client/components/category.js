'use strict'
import React from 'React'
import { connect } from 'react-redux'

export const Category = (props) => {
  const category = props.match.params.category

  const selectedCategory = props.products.products.filter((product) =>
  product.category === category)

  if(selectedCategory){
    return (
      <div className="wrapper">
      <div className="column">
      <h1>{category}</h1>
      <div className="parent">
      {
       selectedCategory.map(product => (
        <div className="child" key={product.id}>

							<a className="child" href={`/products/${product.id}`}>
								<img src={product.imageUrl} width="100" height="100" />
							</a>
							<div> {product.name} </div>
							<div>Price: ${product.price}</div>
							<div>Description: {product.description}</div>
              </div>

        ))
      }
  </div>
    </div>
      </div>
    )
}
}

const mapStateToProps = state => ({
  products: state.products
})

export default connect(mapStateToProps)(Category)
