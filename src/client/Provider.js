import '@babel/polyfill';
import React from "react";
import { Provider } from "react-redux";
import store from "../common/store/configureStore";
import DevTools from "../common/containers/DevTools";
import {BrowserRouter as Router} from "react-router-dom";
//import Routes from "../common/routes";
import Routes from "../common/containers/Routes";
import {hot} from "react-hot-loader";

class ProviderWrap extends React.Component  {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>

          {process.env.NODE_ENV !== "production" && <DevTools />}
          <Router>
            <Routes />

          </Router>

      </Provider>
    );
  }
}

export default hot(module)(ProviderWrap);
