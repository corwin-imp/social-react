import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import { Provider } from "react-redux";
import store from "../common/store/configureStore/configureStore";
import DevTools from "../common/containers/DevTools";
import Routes from "../common/routes";

class ProviderWrap extends React.Component  {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <div style={{ height: "100%" }}>
          {process.env.NODE_ENV !== "production" && <DevTools />}
          <Router >
            <Routes />

          </Router>
        </div>
      </Provider>
    );
  }
}

export default ProviderWrap;
