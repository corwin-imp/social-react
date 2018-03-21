import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import store from '../store/configureStore'
import * as actions from './../actions/actionsItems'
import * as authActions from './../actions/authActions'
import Pictures from '../components/Pictures'

class AppPictures extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    const { pictures, dispatch } = this.props
    if (!pictures.length) {
      dispatch(actions.getFiles('get-pictures'))
    }
  }



  render() {

    console.log('props', this.props)
    return (
      <div id="pagePictures">
        <div id="picturePart" className="part">

          <Pictures
            history={this.props.history}
            images={this.props.pictures}
            rowsValue={3}
            choose={select => this.props.setPicture(select, this.props.idUser)}
            dispatch={this.props.dispatch}
          />


        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    state: state.reducerItems,
    pictures: state.files.pictures,
    idUser: state.auth.user.id,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    delAudio: (id, idBase) => actions.delItem(id, idBase, dispatch),
    getFiles: () => dispatch(actions.getFiles('get-pictures')),
    setPicture: (picture, id) => authActions.setPicture(picture, id, dispatch),
    dispatch: dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppPictures)
