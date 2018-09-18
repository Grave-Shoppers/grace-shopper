// 'use strict'
// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { addReview } from '../store/reviewReducer'

// export class ReviewForm extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       stars: 1,
//       content: ''
//     }
//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }

//   async handleChange(event) {
//     this.setState({
//       [event.target.className]: event.target.value
//     })
//     await this.setState({
//       content: this.props.review.content,
//       stars: this.props.review.stars
//     })
//   }
//   handleSubmit = event => {
//     event.preventDefault()
//     const productId = Number(this.props.match.params.id)
//     this.props.addReview(this.state, productId)
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <div>
//           <label>Review This Product</label>
//           <input
//             className="content"
//             type="text"
//             value={this.state.content}
//             onChange={this.handleChange}
//           />
//         </div>
//         <br />
//         <label>RATINGS</label>
//         <select
//           className="stars"
//           value={this.state.stars}
//           onChange={this.handleChange}
//         >
//           <option value={1}>1</option>
//           <option value={2}>2</option>
//           <option value={3}>3</option>
//           <option value={4}>4</option>
//           <option value={5}>5</option>
//         </select>
//         <button
//           type="button">
//           Submit
//         </button>
//       </form>
//     )
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     addReview(stars, content, id) {
//       dispatch(addReview(stars, content, id))
//     }
//   }
// }
// const mapStateToProps = state => {
//   return {
//     review: state.review
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)
'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postReview, addReview } from '../store/reviewReducer'

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
      [event.target.name]: event.target.value
    })
    // this.props.addReview(this.state)
  }
  handleSubmit = event => {
    event.preventDefault()
    const productId = Number(this.props.selectedProduct[0].id)

    const review = {
      stars: event.target.stars.value,
      content: event.target.content.value,
      productId: productId
    }

    this.props.postReview(review, productId)
    event.target.content.value = ''
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Review This Product</label>
        <textarea name="content" type="text" onChange={this.handleChange} />

        <br />
        <label>RATINGS</label>
        <select name="stars" onChange={this.handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button type="submit" value="submit">
          Submit
        </button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addReivew: content => dispatch(addReview(content)),
  postReview: (review, productId) => dispatch(postReview(review, productId))
  //  dispatch(addReview({stars: 1, content: '' }))
})

const mapStateToProps = state => {
  return {
    reviews: state.review,
    newReview: state.newReview
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)
