import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ItemUpdate from './../components/ItemUpdate'
import * as actions from './../actions/actionsItems'

class AppUpdate extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { item, params, getItem } = this.props
    if (!item) {
      getItem(params.index)
    } else if (item.id != params.index) {
      getItem(params.index)
    }
  }

  render() {
    let id = this.props.params.index
    if (this.props.item && this.props.item.id == this.props.params.index) {
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
