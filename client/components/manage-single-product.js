import React, { Component } from 'React'
import { connect } from 'react-redux'

import { getProducts, updateProduct } from '../store/productReducer'
const initialState = {
  name: '',
  price: 0,
  imageUrl: '',
  description: '',
  quantity: 0,
  category: ''
}

class ManageSingleProduct extends Component {
  constructor(props) {
    super(props)
    const productId = Number(props.match.params.singleId)
    const selectedProduct = props.products.products.filter(
      product => product.id === productId
    )

    if (!selectedProduct[0]) {
      this.state = { ...initialState }
    }
    const product = selectedProduct[0]
    this.state = { ...product }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const newProduct = this.state
    const productId = Number(this.props.match.params.singleId)
    this.props.submitUpdatedProduct(newProduct, productId)
    this.props.getProducts()
  }

  handleChange(evt) {
    const input = evt.target.name
    let value
    if (input === 'quantity' || input === 'price') {
      value = Number(evt.target.value)
    } else {
      value = evt.target.value
    }
    this.setState({
      [input]: value
    })
  }

  handleCategoryChange(evt) {
    this.setState({
      quantity: evt.target.value
    })
  }

  render() {
    const productId = Number(this.props.match.params.singleId)

    const selectedProduct = this.props.products.products.filter(
      product => product.id === productId
    )

    if (!selectedProduct[0]) {
      return <h1>loading...</h1>
    }
    const product = selectedProduct[0]

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <h1>Edit {product.name}</h1>
          <div className="form-field">
            <div className="form-div">
              <label>Product Name</label>
            </div>
            <input
              onChange={this.handleChange}
              type="text"
              name="name"
              placeholder={product.name}
              value={this.state.name}
            />
          </div>

          <div className="form-field">
            <div className="form-div">
              <label>Price (in cents)</label>
            </div>
            <input
              onChange={this.handleChange}
              type="text"
              name="price"
              placeholder={product.price}
              value={this.state.price}
            />
          </div>

          <div className="form-field">
            <div className="form-div">
              <label>Image URL</label>
            </div>
            <input
              onChange={this.handleChange}
              type="text"
              name="imageUrl"
              placeholder={product.imageUrl}
              value={this.state.imageUrl}
            />
          </div>

          <div className="form-field">
            <div className="form-div">
              <label>Description</label>
            </div>
            <input
              onChange={this.handleChange}
              type="text"
              name="description"
              placeholder={product.description}
              value={this.state.description}
            />
          </div>

          <div className="form-field">
            <div className="form-div">
              <label>Quantity</label>
            </div>
            <input
              onChange={this.handleChange}
              type="text"
              name="quantity"
              placeholder={product.quantity}
              value={this.state.quantity}
            />
          </div>

          {/* <div className="form-field">
            <div className="form-div">
              <label>Category</label>
            </div>
            <select defaultValue={product.category} onChange={this.handleCategoryChange}>
              <option>candy</option>
              <option>costume</option>
              <option>pet-costume</option>
              <option>decoration</option>
            </select>
          </div> */}

          <hr />
          <button
            type="submit"
          >
            Submit
        </button>
        </div>
      </form>
      // <div>
      //   <div>
      //     <h3>{selectedProduct[0].name}</h3>
      //   </div>
      //   <img src={selectedProduct[0].imageUrl} width="200" height="200" />

      //   <div>Price: $ {selectedProduct[0].price / 100}</div>
      //   <div>Description: {selectedProduct[0].description}</div>
      // </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts()),
  submitUpdatedProduct: (updatedProduct, productId) => dispatch(updateProduct(updatedProduct, productId))
})

const mapStateToProps = state => ({
  products: state.products
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageSingleProduct)
