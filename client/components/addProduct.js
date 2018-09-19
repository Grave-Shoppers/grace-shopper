import React, { Component } from 'React'
import { connect } from 'react-redux'

import { addNewProduct } from '../store/productReducer'

const initialState = {
  name: '',
  price: 0,
  imageUrl: '',
  description: '',
  quantity: 0,
  category: ''
}

class AddProduct extends Component {
  constructor(props) {
    super(props)
    this.state = { ...initialState }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
  }

  componentDidMount() {
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const newProduct = this.state
    this.props.addProduct(newProduct)
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
      category: evt.target.value
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <h1>Add New Product</h1>
          <div className="form-field">
            <div className="form-div">
              <label>Product Name</label>
            </div>
            <input
              onChange={this.handleChange}
              type="text"
              name="name"
              placeholder="Product Name"
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
              placeholder="000"
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
              placeholder="Image URL"
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
              placeholder="Product Description"
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
              placeholder="100"
              value={this.state.quantity}
            />
          </div>

          <div className="form-field">
            <div className="form-div">
              <label>Category</label>
            </div>
            <select onChange={this.handleCategoryChange}>
              <option>candy</option>
              <option>costume</option>
              <option>pet-costume</option>
              <option>decoration</option>
            </select>
          </div>

          <hr />
          <button
            type="submit"
          >
            Add Product
        </button>
        </div>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  addProduct: (newProduct) => dispatch(addNewProduct(newProduct)).then(() => {
    ownProps.history.push('/manageProduct')
  })
})

const mapStateToProps = state => ({
  products: state.products
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
