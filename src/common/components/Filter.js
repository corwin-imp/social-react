import React from 'react';
import { Button } from 'react-bootstrap';
import Input from './Input';

import FontAwesome from 'react-fontawesome';
export default class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ageFr: '',
      ageTo: '',
      gender: '',
      city: this.props.city,
      country: this.props.country,
      countrySend: this.props.countrySend,
      citySend: this.props.citySend,
    };
    this.onAgeFr = this.onAgeFr.bind(this);
    this.onAgeTo = this.onAgeTo.bind(this);
    this.sendTo = this.sendTo.bind(this);
    this.onGender = this.onGender.bind(this);

  }
  findFull(state) {
    console.log('state', state);
    this.props.onFindSearch(state);
  }

  sendTo() {
        this.props.onFindSearch(this.state);
  }
  onAgeFr(event) {
    this.setState({
      ageFr: event.target.value,
    });

    this.findFull({
      ...this.state,
      ageFr: event.target.value,
    });
  }
  onAgeTo(event) {
        this.setState({
            ageTo: event.target.value,
        });
        this.findFull({
            ...this.state,
            ageTo: event.target.value,
        });
    }
  onGender(event) {
    this.setState({
      gender: event.target.value,
    });

    this.findFull({
      ...this.state,
      gender: event.target.value,
    });
  }
  render() {

    return (
      <form role="form">
          <b >Country:</b>
        <div className="form-group formInp" >

                <Input
                    id="country"
                    className={`form-control`}
                    type="text"
                    onChange={this.props.onCountry}
                    onKeyPress={this.sendTo}
                    value={this.state.country}
                />
                <Button
                    className={`btnSearch ${(this.props.countrySend) ? ' act' : ''} `}
                    onClick={this.sendTo}
                >
                    <FontAwesome
                        className="super-crazy-colors"
                        name="search"
                        size="lg"
                    />
                </Button>


        </div>
          <b >City:</b>
        <div className="form-group formInp">


                <Input
                    id="city"
                    className={`form-control`}
                    type="text"
                    onKeyPress={this.sendTo}
                    onChange={this.props.onCity}
                    value={this.state.city}
                />
                <Button
                    className={`btnSearch ${(this.props.citySend) ? ' act' : ''} `}
                    onClick={this.sendTo}
                >
                    <FontAwesome
                        className="super-crazy-colors"
                        name="search"
                        size="lg"
                    />
                </Button>

        </div>
        <div className="form-group">
          <label htmlFor="age">Age: </label>
            <div className="selects">
                <span>From:</span>
                <select
                    id="ageFr"
                    className={`form-control ${(this.state.ageFr) ? ' act' : ''} `}
                    onChange={this.onAgeFr}
                    value={this.state.Selected}
                >
                    <option value="">choose</option>

                    {range(71, 10).map( (v, k) =>

                        <option key={v} value={v}>{`from ${v}`}</option>
                    )}
                </select>
                <span>To:</span>
                <select
                    id="ageTo"
                    className={`form-control ${(this.state.ageTo) ? ' act' : ''} `}
                    onChange={this.onAgeTo}
                    value={this.state.Selected}
                >
                    <option value="">choose</option>
                    {range(71, 10).map( (v, k) =>

                        <option key={v} value={v}>{`to ${v}`}</option>
                    )}
                </select>
            </div>

        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender: </label>

          <select
            id="gender"
            className={`form-control ${(this.state.gender) ? ' act' : ''} `}
            onChange={this.onGender}
            value={this.state.Selected}
          >
            <option value="">choose</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
      </form>
    );
  }
}
function range(a, b, c) {
  c = [];
  while (a--) c[a] = a + b;
  return c;
}
