'use strict'
import React from 'React'
import { connect } from 'react-redux'

export const Category = (props) => {
  const category = props.match.params.category

  const selectedCategory = props.products.products.filter((product) =>
  product.category === category)

  if(selectedCategory){
    return (
      <div className="container">
      <h1>{category}</h1>
    <ul className="tile">
      {
       selectedCategory.map(product => (

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
}

const mapStateToProps = state => ({
  products: state.products
})

export default connect(mapStateToProps)(Category)
