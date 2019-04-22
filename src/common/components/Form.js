import React from 'react'
import Input from './Input'
import Button from './Button'

export default class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number: 0,
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange(event) {
    this.setState({
      number: event.target.value,
    })
  }
  render() {
    return (
      <form>
        <div className="form-group">
          <label for="device">
            Number:
            <Input
              placeholder="Choose device"
              id="device"
              type="number"
              className="form-control"
              onChange={this.onChange}
              value={this.state.number}
            />
          </label>
        </div>

        <Button onClick={() => this.props.add(this.state.number)} text="+" />
        <Button onClick={() => this.props.del(this.state.number)} text="-" />
        <div>Sum: {this.props.sum}</div>
      </form>
    )
  }
}
