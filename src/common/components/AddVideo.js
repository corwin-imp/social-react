import React from 'react'
import Input from './Input'
import Button from './Button'
export default class AddVideo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      src: '',
    }
    this.onName = this.onName.bind(this)
    this.onSrc = this.onSrc.bind(this)
  }
  onName(event) {
    this.setState({
      name: event.target.value,
    })
  }
  onSrc(event) {
    this.setState({
      src: event.target.value,
    })
  }

  render() {
    return (
      <div className="part addVideo">
        <div className="title">Add video</div>
        <form className="form-inline" role="form">
          <div className="form-group">
            <label htmlFor="labelVideo">Label video: </label>
            <Input
              id="labelVideo"
              type="text"
              onChange={this.onName}
              value={this.state.name}
            />
            <label htmlFor="src">Src:</label>
            <Input
              id="src"
              type="text"
              onChange={this.onSrc}
              value={this.state.src}
            />
          </div>

          <Button
            onCl="btnAdd"
            onClick={() => this.props.addVideo(this.state)}
            text="Add"
          />
        </form>
      </div>
    )
  }
}
