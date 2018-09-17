'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addReview } from '../store/reviewReducer'

export class ReviewForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stars: 1,
      content: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.className]: event.target.value
    })
  }
  handleSubmit = async event => {
    event.preventDefault()
    const productId = Number(this.props.match.params.id)
    this.props.addReview(this.state, productId)
    await this.setState({
      content: this.props.review.content,
      stars: this.props.review.stars
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Review This Product</label>
          <input
            className="content"
            type="text"
            value={this.state.content}
            onChange={this.handleChange}
          />
        </div>
        <br />
        <label>RATINGS</label>
        <select
          className="stars"
          value={this.state.stars}
          onChange={this.handleChange}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <button
          type="button"
          onClick={event => {
            event.preventDefault()
            this.props.addReview(
              this.state.stars,
              this.state.content,
              this.props.selectedProduct.id
            )
          }}
        >
          Submit
        </button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addReview(stars, body, id) {
      dispatch(addReview(stars, body, id))
    }
  }
}
const mapStateToProps = state => {
  return {
    review: state.review
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)
