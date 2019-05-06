import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { welcomePage } from '../store/App/actionsApp'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import FBSignIn from './FBSignIn'
import SignIn from './SignIn'

class WelcomePage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      username: '',
    }
  }

  componentDidMount() {

    this.usernameInput.focus()
  }

  handleChange(event) {
    if (event.target.name === 'username') {
      this.setState({ username: event.target.value })
    }
  }

  handleSubmit() {
    const { dispatch } = this.props
    const username = this.state.username
    dispatch(welcomePage(username))
    this.setState({ username: '' })
  }

  render() {
    const { screenWidth } = this.props
    /*if(screenWidth < 500) {
         return (
         <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
         <header style={{textAlign: 'center'}}>

         </header>
         <main>
         <form>
         <Input
         style={{height: '2.7em', fontSize: '1.3em', width: '100%'}}
         ref="usernameInput"
         type="text"
         name="username"
         value={this.state.username}
         placeholder="Enter username"
         onChange={this.handleChange}
         />
         <Link to="/signup">
         <Button
         bsStyle="success"
         style={{width: '100%'}}
         type="submit"
         onClick={this.handleSubmit}>
         <p style={{margin: '0', padding: '0', fontSize: '1.5em'}}>Sign Up</p>
         </Button>
         </Link>
         </form>
         <p style={{margin: '1em', textAlign: 'center'}}>Or</p>
         <Link to="/signin">
         <Button style={{width: '100%'}} bsStyle="default" >Sign in</Button>
         </Link>
         </main>
         </div>
         );
         }*/
    return (
      <div className="autoPages part">
        <header
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexGrow: '0',
            order: '0',
          }}
        >
          Sign Up to Social
        </header>
        <main style={{ display: 'flex', justifyContent: 'center' }}>
          <form style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{ margin: 'auto', paddingRight: '0.2em', height: '3.5em' }}
            >
              <Form.Control
                style={{ height: '2.7em', fontSize: '1.3em' }}
                ref={(ref) => this.usernameInput = ref}

                type="text"
                name="username"
                value={this.state.username}
                placeholder="Enter username"
                onChange={this.handleChange}
              />
            </div>
            <section style={{ margin: 'auto', width: '12em', height: '3.5em' }}>
              <Link to="/signup">
                <Button
                  className="btnAuto"
                  variant="success"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  <p style={{ margin: '0', padding: '0', fontSize: '1.5em' }}>
                    Sign Up
                  </p>
                </Button>
              </Link>
            </section>
          </form>
          <div
            style={{
              height: '3.5em',
              width: '12em',
              alignSelf: 'center',
              display: 'flex',
              marginLeft: '1em',
            }}
          >
            <p style={{ marginRight: '1em', marginTop: '1em' }}> Or </p>
            <Link to="/signin">
              <Button
                style={{ margin: 'auto', height: '3.5em' }}
                variant="default"
              >
                Sign in
              </Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    screenWidth: state.environment.screenWidth,
  }
}

export default connect(mapStateToProps)(WelcomePage)
