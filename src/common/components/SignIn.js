import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Input } from 'react-bootstrap'
import * as authActions from '../store/Auth/actionsAuth'

class SignIn extends Component {
  static propTypes = {
    welcomePage: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
  }
  constructor(props, context) {
    super(props, context)
    this.state = {
      username: this.props.welcomePage || '',
      password: '',
    }
  }
  componentDidMount() {
    if (this.state.username.length) {
      this.refs.passwordInput.getInputDOMNode().focus()
    } else {
      this.refs.usernameInput.getInputDOMNode().focus()
    }
  }
  handleChange(event) {
    if (event.target.name === 'username') {
      this.setState({ username: event.target.value })
    }
    if (event.target.name === 'password') {
      this.setState({ password: event.target.value })
    }
  }
  handleSubmit(event) {
    event.preventDefault()
    const { dispatch } = this.props
    if (this.state.username.length < 1) {
      this.refs.usernameInput.getInputDOMNode().focus()
    }
    if (this.state.username.length > 0 && this.state.password.length < 1) {
      this.refs.passwordInput.getInputDOMNode().focus()
    }
    if (this.state.username.length > 0 && this.state.password.length > 0) {
      var userObj = {
        username: this.state.username,
        password: this.state.password,
      }
      dispatch(authActions.signIn(userObj))
      this.setState({ username: '', password: '' })
    }
  }
  render() {
    return (
      <div className="autoPages signIn part">
        <header
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexGrow: '0',
            order: '0',
          }}
        >
          Login to Social
        </header>
        <main style={{ display: 'flex', justifyContent: 'center' }}>
          <form onSubmit={this.handleSubmit}>
            <Input
              label="Username"
              ref="usernameInput"
              type="text"
              name="username"
              placeholder="Enter username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <Input
              label="Password"
              ref="passwordInput"
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <Button
              className="btnAuto"
              bsStyle="success"
              name="submitButton"
              type="submit"
            >
              <p
                style={{
                  color: 'white',
                  margin: '0',
                  padding: '0',
                  fontSize: '1.5em',
                }}
              >
                Sign In
              </p>
            </Button>
          </form>
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    welcomePage: state.welcomePage,
  }
}
export default connect(mapStateToProps)(SignIn)
