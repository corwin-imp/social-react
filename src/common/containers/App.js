import React from 'react'
import { Link } from 'react-router-dom'
import { browserHistory } from 'react-router'

import { initEnvironment } from '../store/App/actionsApp'
import { connect } from 'react-redux'

import { receiveAuth } from '../store/Auth/actionsAuth'
import * as authActions from '../store/Auth/actionsAuth'
import * as actionsD from '../store/Profile/actionsProfile'
import Search from '../components/Search'
import { css } from 'aphrodite'
import {
  Modal,
  DropdownButton,
  Dropdown,
MenuItem,
  Button,
  Navbar,
  NavDropdown,
  Nav,
  NavItem,
} from 'react-bootstrap'
import Audio from '../components/Audio'
import styles from '../css/AppStyles'
import FontAwesome from 'react-fontawesome'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
    }
  }

  onSearch(event) {
    this.setState({
      gender: event.target.value,
    })
  }

  componentDidMount() {
    const { dispatch, user, location } = this.props

    if (!user.id) {
      dispatch(receiveAuth())

    } else {
      if (location.pathname == '/') {
        browserHistory.push('/my-profile')
      }
    }
    if (!this.props.music.length) {
      dispatch(actionsD.getFiles('get-music'))
    }
    dispatch(initEnvironment())
    actionsD.getItems(dispatch)
  }

  handleSignOut() {
    const { dispatch } = this.props
    dispatch(authActions.signOut())
  }

  render() {
    const { user, location,audio } = this.props

    audio['music'] =  this.props.music;
    const username = this.props.user.username
    const { screenHeight, isMobile, screenWidth } = this.props.environment
/*    const searchForm = (
      <form role="form">
        <Input
          id="search"
          type="text"
          onChange={this.onSearch}
          value={this.state.search}
        />
        <Button
          bsStyle="success"
          className="hidden"
          style={{ width: '100%' }}
          type="submit"
          onClick={() => this.props.searchProfiles(this.state)}
        >
          <p style={{ margin: '0', padding: '0', fontSize: '1.5em' }}>Search</p>
        </Button>
      </form>
    )*/
    const dropDownMenu = (
      <div className="myProfile">
        <Link id="personLink" to="/my-profile">
          {' '}
          <FontAwesome
            className="super-crazy-colors"
            name="chess-rook"
            size="lg"
            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
          />
        </Link>

        <DropdownButton
          key={1}
          style={{ width: '21rem' }}
          id="user-menu"
          title={username}
        >
          <Dropdown.Item
            style={{ width: '21rem' }}
            eventKey="4"
            onSelect={this.handleSignOut}
          >
            Signout
          </Dropdown.Item>
        </DropdownButton>
      </div>
    )
    if (isMobile) {
      return (
        <div style={{ height: `${screenHeight}px`, width: `${screenWidth}px` }}>
          {(this.props.items.size) && this.props.children}
        </div>
      )
    }

    return (
      <div id="mainApp">
        <header id="headApp">
          <div className="topItem" id="headAppLinks">
            {user.id ? (
              dropDownMenu
            ) : (
              <Link className="autoLink" to="/">
                Auto
              </Link>
            )}
            {(location.pathname != '/profiles' ) &&
            <Search dispatch={this.props.dispatch} fullSearch={false} userId ={this.props.user.id} />
            }
            </div>
          <div className="topItem" id="headAppAudio">
            <Audio
              path={location.pathname}
              top={true}
              audio={audio}
              dispatch={this.props.dispatch}
            />
          </div>
        </header>
        <div id="contentApp">
          <aside id="sideApp">
            <ul className="sideAppNav">
              <li>
                <Link to="/profiles">Profiles</Link>
              </li>
              <li>
                <Link to="/audio">Audio</Link>
              </li>
              <li>
                <Link to="/video">Video</Link>
              </li>
              <li>
                <Link to="/pictures">Pictures</Link>
              </li>
              <li>
                <Link to="/chat">Chat</Link>
              </li>
            </ul>
          </aside>
          <div id="AppContent">{(this.props.items.size) ? this.props.children : ''}</div>
        </div>
        {/*<footer id="footerApp">
                 <ul className="columnFooter">
                 <li><a href="#">1 link</a></li>
                 <li><a href="#">2 link</a></li>
                 </ul>
                 <ul className="columnFooter">
                 <li><a href="#">3 link</a></li>
                 <li><a href="#">4 link</a></li>
                 </ul>
                 </footer>*/}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    environment: state.environment,
    user: state.auth.user,
    state: state,
    items: state.reducerItems.items,
    audio: state.audio,
    music: state.files.music,
    pictures: state.files.pictures,
  }
}

export default connect(mapStateToProps)(App)
