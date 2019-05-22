import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ItemUpdate from './../components/ItemUpdate'
import * as actions from '../store/Profile/actionsProfile'

class AppUpdate extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { item, params, getItem } = this.props
    if (!item) {
      getItem(params.Chats)
    } else if (item.id != params.Chats) {
      getItem(params.Chats)
    }
  }

  render() {
    let id = this.props.params.Chats
    if (this.props.item && this.props.item.id == this.props.params.Chats) {
      return (
        <div className="page DevicePage">
          <ItemUpdate
            item={this.props.item}
            updateItem={this.props.updateItem}
            history={this.props.history}
            idItem={id}
          />
        </div>
      )
    } else {
      return false
    }
  }
}

const mapStateToProps = state => {
  return {
    state: state.reducerItems,
    item: state.reducerItems.item,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    delItem: idBase => actions.delItem(idBase, dispatch),
    updateItem: (data, idBase) => dispatch(actions.updateItem(data, idBase)),
    getItem: id => dispatch(actions.getItem(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppUpdate)
