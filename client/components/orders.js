import React from 'react';
import { connect } from 'react-redux';

const PastOrders = (props) => {
  const { currentUser } = props
  const userId = currentUser.id

  return (
    <div>
      <span>Welcome {currentUser.firstName}</span><br/>
      Your Past Orders
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.user
  }
}

export default connect(mapStateToProps)(PastOrders)
