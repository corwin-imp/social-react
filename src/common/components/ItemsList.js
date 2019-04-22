import React from 'react'

import Switcher from './Switcher'
import { Link } from 'react-router-dom'
import Choose from './choose'
import { Button, Thumbnail } from 'react-bootstrap'

export default class ItemsList extends React.Component {
  constructor(props, context) {
    super(props, context)
  }
  render() {
    let itemsArr = []
    if (!this.props.items) {
      return false
    }
    if (Object.keys(this.props.items).length || this.props.items.size) {
      for (let [key, value] of this.props.items) {
        itemsArr.push(value)
      }
    }

    if (this.props.selectItem) {
      return (
        <div className={`itemList ${this.props.className} itemsSelect `}>
          {itemsArr.map((value, index) => (
            <div
              className="itemLink"
              key={index}
              onClick={e => this.props.selectItem(e, value)}
            >
              <div className="imageItem">
                <img
                  src={
                    value.picture
                      ? value.picture
                      : require('../images/profile.png')
                  }
                  width="60"
                  height="60"
                />
              </div>
              <div className="itemName">{value.name}</div>
              {value.status ? <div className="status" /> : ''}
            </div>
          ))}
        </div>
      )
    } else {
      return (
        <div className={`itemList ${this.props.className}`}>
          {itemsArr.map((value, index) => (
            <div className="item" key={index}>
              <Link
                className="itemLink"
                to={`/profiles/${value.dataId}`}
                onClick={() => this.props.getItem(value.dataId)}
              >
                <div className="imageItem">
                  <img
                    src={
                      value.picture
                        ? value.picture
                        : require('../images/profile.png')
                    }
                    width="125"
                    height="125"
                  />
                </div>
                <div className="itemInfo">
                  <div className="itemName">{value.name}</div>
                  <div className="itemprop">{value.country}{(value.city) && `, ${value.city}`}</div>

                </div>
                {value.status ? <div className="status" /> : ''}
              </Link>
              <div className="itemButtons">
                <Button bsStyle="primary">Add Contact</Button>
              </div>
            </div>
          ))}
        </div>
      )
    }
  }
}
