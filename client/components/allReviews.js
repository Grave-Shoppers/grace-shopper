'use strict'
import React, {Component} from 'React'
import {connect} from 'react-redux'
import {getReviews} from '../store'

const mapStateToProps = state => ({
  reviews: state.reviewReducer.reviews
})

const mapDispatchToProps = dispatch => ({
  getReviews: productId => dispatch(getReviews(productId))
})

class AllReviews extends Component {
  componentDidMount() {
    const id = Number(this.props.selectedProduct[0].id)
    this.props.getReviews(id)
  }
  render() {
    console.log('THESE ARE PROPS', this.props)

    return (
      <div className="reviews">
        {this.props.reviews.map(review => (
          <div key={review.id}>
            <div>Stars: {review.stars}</div>
            <div>Review: {review.content}</div>
          </div>
        ))}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllReviews)
