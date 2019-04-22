import React from 'react'
import Input from './Input'
import Button from './Button'

export default class AddItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      //  age: "",
      //  gender: "male",
      //  email: "",
    }
    this.onName = this.onName.bind(this)
    this.onEmail = this.onEmail.bind(this)
    this.onAge = this.onAge.bind(this)
    this.onGender = this.onGender.bind(this)
  }
  onName(event) {
    this.setState({
      name: event.target.value,
    })
  }
  onEmail(event) {
    this.setState({
      email: event.target.value,
    })
  }
  onAge(event) {
    this.setState({
      age: event.target.value,
    })
  }
  onGender(event) {
    this.setState({
      gender: event.target.value,
    })
  }
  render() {
    return (
      <div class="addItem">
        <form className="form-inline" role="form">
          <div className="form-group">
            <label htmlFor="device" className="sr-only">
              {this.props.value}:{' '}
            </label>

            <Input
              id="name"
              type="text"
              onChange={this.onName}
              value={this.state.name}
            />

            {/* <Input id="email"  type="text" onChange={this.onEmail} value={this.state.email} />
                    <Input id="age"  type="number" onChange={this.onAge} value={this.state.age} />
                    <select id="gender" onChange={this.onGender}  value={this.state.Selected} >
                    <option value="male">male</option>
                    <option value="female">female</option>
                    </select>*/}
          </div>

          <Button onClick={() => this.props.addItem(this.state)} text="Add" />
        </form>
      </div>
    )
  }
}
