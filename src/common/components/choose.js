import React from 'react'
import Input from './Input'
import Button from './Button'

export default class Choose extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      choose: '',
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    this.setState({
      choose: event.target.value,
    })
  }

  render() {
    return (
      <div className="choose">
        <form>
          <label className="btnLabel">{this.props.feature}:</label>
          <div className="form-group">
            <Input
              type="text"
              onChange={this.onChange}
              value={this.state.choose}
            />

            <Button
              onClick={() => this.choose(this.state.choose, this.props.name)}
              text="Choose"
            />
          </div>
        </form>
      </div>
    )
  }
}
