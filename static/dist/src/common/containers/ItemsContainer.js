"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const ItemsList_1 = tslib_1.__importDefault(require("./../components/ItemsList"));
const Filter_1 = tslib_1.__importDefault(require("./../components/Filter"));
const Search_1 = tslib_1.__importDefault(require("../components/Search"));
const actions = tslib_1.__importStar(require("../store/Profile/actionsProfile"));
const socket_io_client_1 = tslib_1.__importDefault(require("socket.io-client"));
const react_key_handler_1 = tslib_1.__importStar(require("react-key-handler"));
const socket = socket_io_client_1.default('', { path: '/api/chat' });
class ItemsContainer extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsFind: this.props.items,
            findSearch: this.props.findSearch,
            ageTo: '',
            'ageFr': '',
            'name': '',
            'local.gender': '',
            'country': '',
            'countrySend': 0,
            'citySend': 0,
            'city': '',
        };
        this.find = this.find.bind(this);
        this.fromFilter = this.fromFilter.bind(this);
        this.fromSearch = this.fromSearch.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        console.log('mount');
    }
    handleKeyPress() {
        let obj = this.state;
        obj['local.city'] = obj.city;
        obj['local.country'] = obj.country;
        delete obj.itemsFind;
        delete obj.countrySend;
        delete obj.country;
        delete obj.citySend;
        delete obj.city;
        console.log('send', this.state);
        this.find(this.state);
    }
    fromSearch(obj) {
        console.log(222);
        this.setState({
            findSearch: obj.name,
        });
        let newObj = {
            'ageTo': this.state.ageTo,
            'ageFr': this.state.ageFr,
            'name': obj.name,
            'local.gender': this.state['local.gender'],
            'local.country': this.state['country'],
            'local.city': this.state['city'],
        };
        console.log('newObj', newObj);
        this.find(newObj);
    }
    fromFilter(obj) {
        console.log(333);
        let newObj = {
            'ageTo': obj.ageTo,
            'ageFr': obj.ageFr,
            'name': this.state.findSearch,
            'local.gender': obj.gender,
            'local.country': this.state.country,
            'local.city': this.state.city,
        };
        this.find(newObj);
    }
    onCountry(event) {
        console.log('count', event.target.value);
        this.setState({
            country: event.target.value,
        });
    }
    onCity(event) {
        this.setState({
            city: event.target.value,
        });
    }
    find(find) {
        console.log('find', find);
        let citySend = 0;
        let countrySend = 0;
        if (this.state.city) {
            citySend = 1;
        }
        if (this.state.country) {
            countrySend = 1;
        }
        this.setState({
            'countrySend': countrySend,
            'citySend': citySend,
        });
        console.log(444);
        for (let item in find) {
            if (!find[item]) {
                delete find[item];
            }
        }
        actions.quickSearch(find).then(result => {
            let itemsBase = result['data'];
            if (itemsBase.length) {
                let newItems = new Map();
                let ids = [];
                itemsBase.forEach((item, i, arr) => {
                    let user = item['local'];
                    if (item._id == this.props.user.id) {
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
                /*socket.emit('get users', ids)
                socket.on('server users', (message)=> {
                  var people = JSON.parse(message)
              
                  let NewMap = new Map()
                  for (let value of newItems) {
                    if (people.indexOf(value[0]) != -1) {
                      var status = 1
                    } else {
                      var status = 0
                    }
              
                    value[1].status = status
                    NewMap.set(value['0'], value[1])
                  }
                  console.log('onErr',this.props);
                  this.setState({
                    itemsFind: NewMap
                  });
              
                })*/
                this.setState({
                    itemsFind: newItems
                });
            }
            else {
                this.setState({
                    itemsFind: []
                });
            }
        }, error => {
            console.log('err');
            console.log(error);
        });
    }
    componentDidMount() {
        if (this.props.findSearch) {
            console.log('search', this.props.findSearch);
            this.find({ name: this.props.findSearch });
        }
    }
    componentWillUnmount() {
        const { dispatch } = this.props;
        console.log('unmount');
        dispatch(actions.clearSearch(false));
    }
    /*  componentWillMount(){
        const { findSearch } = this.props
        if(findSearch){
    
          this.findSearch({ name: findSearch });
    
        }
      }*/
    /*  componentDidUpdate(prevProps, prevState){
    console.log('props',this.state);
        if(!this.state.itemsFind.size && this.props.items.size && this.state.findSearch ){
          console.log('find',this.props.items);
          this.setState({
            itemsFind: this.props.items
          })
        }
      }*/
    render() {
        return (react_1.default.createElement("div", { id: "profilesPage" },
            react_1.default.createElement(react_key_handler_1.default, { keyEventName: react_key_handler_1.KEYPRESS, keyValue: "Enter", onKeyHandle: this.handleKeyPress }),
            react_1.default.createElement("div", { className: "mainPart part" },
                react_1.default.createElement("div", { className: "fullSearch stickyPart" },
                    react_1.default.createElement(Search_1.default, { onFindSearch: (obj) => this.fromSearch(obj), fullSearch: true, findSearch: this.props.findSearch, dispatch: this.props.dispatch, userId: this.props.user.id })),
                react_1.default.createElement(ItemsList_1.default, Object.assign({}, this.props, { items: this.state.itemsFind, delItem: this.props.delItem, getItem: this.props.getItem }))),
            react_1.default.createElement("div", { className: "rightSide part" },
                react_1.default.createElement("div", { className: "stickyPart" },
                    react_1.default.createElement(Filter_1.default, { onCity: this.onCity.bind(this), onCountry: this.onCountry.bind(this), citySend: this.state.citySend, countrySend: this.state.countrySend, onFindSearch: (obj) => this.fromFilter(obj), params: this.props.params })))));
    }
}
const mapStateToProps = state => {
    return {
        state: state.reducerItems,
        items: state.reducerItems.items,
        item: state.reducerItems.item,
        findSearch: state.reducerItems.findSearch,
        params: [],
        user: state.auth.user,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        addItem: data => dispatch(actions.addItem(data)),
        delItem: name => dispatch(actions.delItem(id)),
        getItem: (item, id) => dispatch(actions.getItem(item, id)),
        getItems: () => dispatch(getItems()),
        dispatch: dispatch,
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);
