import React from 'react';
import * as actions from './../actions/actionsItems';
import { Button, Input } from 'react-bootstrap';
import InputMy from './Input';
import FontAwesome from 'react-fontawesome';
import ItemsList from './ItemsList';
export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: (this.props.findSearch) ? this.props.findSearch : '',
      nameSend:(this.props.findSearch) ? 1 : 0,
      items: [],
      //  age: "",
      //  gender: "male",
      //  email: "",
    };
    this.onSearch = this.onSearch.bind(this);
    this.searchItems = this.searchItems.bind(this);
    this.findFUll = this.findFUll.bind(this);
    this.onFullSearch = this.onFullSearch.bind(this);
    this.getItem = this.getItem.bind(this);
  }
  onFullSearch(event) {
    let value = event.target.value;
    this.setState({
      searchName: value,
    });
  }
  findFUll(){
let NameSend = 0;
      if(this.state.searchName){
          NameSend = 1;
      }
      this.setState({
          'nameSend': NameSend,
      });
      const findObj = {
          'name': this.state.searchName,
      }
      console.log(111);
      this.props.onFindSearch(findObj)
  }
  onSearch(event) {

      console.log(111);
    let value = event.target.value;
      this.setState({

          searchName: value,
      });
    if (value.length > 2) {

      actions.quickSearch({ name: value }).then(
        result => {

          let itemsBase = result['data'];
          if (itemsBase.length) {

            let newItems = new Map();
            let ids = [];

            itemsBase.forEach((item, i, arr) => {
              let user = item['local'];
              if (item._id == this.props.userId) {
                return;
              }
              let newItem = {
                name: user.username,
                city: user.city,
                picture: user.picture,
                country: user.country,
              };

              newItem['dataId'] = item._id;
              ids.push(item._id);
              newItems.set(item._id, newItem);
            });

            this.setState({
              items: newItems,

            });
          }else{
              this.setState({

                  items: [],
              });
          }
        },
        error => {
          console.log('err');
          console.log(error);
        }
      );
    } else {
      this.setState({
        items: [],
      });
    }
  }
  searchItems() {
      if(this.state.searchName){
          const {dispatch} = this.props;
          dispatch(actions.fullSearch(this.state.searchName));
          console.log('search');
      }

  }
  getItem(item, id) {
    this.setState({
      searchName: '',
      items: [],
    });

    const { dispatch } = this.props;

    dispatch(actions.getItem(item, id));
  }

  render() {
    if(this.props.fullSearch){
      return (
          <div id="searchForm" className="form-inline">
            <div className="form-group searchCont">

              <InputMy
                  placeholder="Find"
                  type="text"
                  name="searchName"
                  placeholder="Find"
                  onKeyPress={this.findFUll}
                  value={this.state.searchName}
                  onChange={this.onFullSearch}
              />
                <Button
                    className={`btnSearch ${(this.state.nameSend) ? ' act' : ''} `}
                    onClick={this.findFUll}
                    type="button"
                >
                    <FontAwesome
                        className="super-crazy-colors"
                        name="search"
                        size="lg"
                    />
                </Button>



            </div>
          </div>
      );
    }else{
      return (
          <div id="searchForm" className="form-inline">
            <div className="form-group searchCont">
              <FontAwesome
                  className="super-crazy-colors"
                  name="search"
                  size="lg"

              />
                  <Input
                      ref="friendName"
                      type="text"
                      hasFeedback
                      name="searchName"
                      autoFocus={false}
                      placeholder="Find"
                      value={this.state.searchName}
                      onChange={this.onSearch}
                  />
            </div>

            {this.state.items.size ?
                <ItemsList
                    {...this.props}
                    className="simle"
                    items={this.state.items}
                    getItem={this.getItem}
                />
            : ''}
            {this.state.searchName && (
                <Button
                    className="btnSearch"
                    onClick={this.searchItems}
                    type="button"
                >
                  View All
                </Button>
            )}
          </div>
      );
    }

  }
}
