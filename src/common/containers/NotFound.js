import React, { Component } from 'react'
class NotFound extends Component {
  render() {
    return (
      <section>
        <div className="heading_second">Device name</div>
        <div className="device">
          <div className="heading_third">Options:</div>
          <div id="option_1" className="option">
            <div className="opt_name">Volume:</div>
            <div className="opt_value">Volume value</div>
          </div>
          <div id="option_2" className="option">
            <div className="opt_name">Song:</div>
            <div className="opt_value">Song value</div>
          </div>
          <div id="option_3" className="option">
            <div className="opt_name">List:</div>
            <div className="opt_value">option value</div>
          </div>
          <div id="option_4" className="option">
            <div className="opt_name">play:</div>
            <div className="opt_value">></div>
          </div>
        </div>
      </section>
    )
  }
}
export default NotFound
