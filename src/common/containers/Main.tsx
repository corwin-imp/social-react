import React, { Component } from 'react'

class Main extends Component {
  render() {
    return (
      <div className="page homePage">
        <div className="category_name heading_second">rooms</div>
        <div className="homeSection roomsSection">
          <div className="add">
            <b>Add room</b>
            <input value="" />
          </div>
          <div className="selects rooms">
            <a href="leasure_room">
              <b>leasure room</b>
            </a>
            <a href="kitchen">
              <b>kitchen</b>
            </a>
          </div>
        </div>
        <div className="category_name heading_second">Types</div>
        <div className="homeSection TypeSection">
          <div className="add">
            <b>Add type</b>
            <input value="" />
          </div>
          <div className="selects types">
            <a href="leasure">leasure</a>
            <a href="security">security</a>
          </div>
        </div>
      </div>
    )
  }
}
export default Main
