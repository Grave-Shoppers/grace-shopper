'use strict'
import React, {Component} from 'React'
import {connect} from 'react-redux'
import {getUsers, deleteUser} from '../store/userAdmin'

const mapStateToProps = state => ({
  users: state.userReducer.users
})

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers()),
  deleteUser: userId => dispatch(deleteUser(userId))
})

class AdminUsers extends Component {
  constructor() {
    super()
    // this.state = {}
  }
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const users = this.props.users
    console.log('here are the users hopefully', users)
    return (
      <div>
        <div>
          {this.props.users.map(user => (
            <div key={user.id}>
              <div>
                Name: {user.firstName} {user.lastName}{' '}
              </div>
              <div>Address: {user.address}</div>
              <div>Email: {user.email}</div>
              <button
                type="button"
                onClick={() => {
                  this.props.deleteUser(user.id)
                  this.props.getUsers()
                }}
                className="btn btn-primary btn-sm"
              >
                Delete User
              </button>
              <div>
                <br />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers)
