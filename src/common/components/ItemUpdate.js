import React from 'react'
import { Input } from 'react-bootstrap'
import Button from './Button'

export default class ItemUpdate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.item.name,
      age: this.props.item.age,
      gender: 'male',
      email: this.props.item.email,
      city: this.props.item.city,
      country: this.props.item.country,
      idItem: this.props.idItem,
    }
    this.onName = this.onName.bind(this)
    this.onEmail = this.onEmail.bind(this)
    this.onAge = this.onAge.bind(this)
    this.onGender = this.onGender.bind(this)
    this.onCountry = this.onCountry.bind(this)
    this.onCity = this.onCity.bind(this)
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

  onCountry(event) {
    this.setState({
      country: event.target.value,
    })
  }

  onCity(event) {
    this.setState({
      city: event.target.value,
    })
  }

  render() {
    return (
      <form role="form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>

          <Input
            id="name"
            className="form-control"
            type="text"
            onChange={this.onName}
            value={this.state.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>

          <Input
            id="email"
            className="form-control"
            type="text"
            onChange={this.onEmail}
            value={this.state.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>

          <Input
            id="city"
            className="form-control"
            type="text"
            onChange={this.onCity}
            value={this.state.city}
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country:</label>

          <Input
            id="country"
            className="form-control"
            type="text"
            onChange={this.onCountry}
            value={this.state.country}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age: </label>

          <Input
            id="age"
            min="0"
            className="form-control"
            type="number"
            onChange={this.onAge}
            value={this.state.age}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender: </label>

          <select
            id="gender"
            className="form-control"
            onChange={this.onGender}
            value={this.state.Selected}
          >
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>

        <Button
          onClick={() => this.props.updateItem(this.state, this.props.item.id)}
          text="Update"
        />
      </form>
    )
  }
}
