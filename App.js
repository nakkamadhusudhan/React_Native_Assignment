import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import AppWithNavigationState, { middleware } from "./containers/Navigator";
import rootReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import {productWatchers} from "./sagas/product";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  {
    productState: { 
    products: [],
    product: {},
    isLoading: false,
    isRefreshing: false,
    filteredAllProducts: [],
    page: 1,
    limit:40
 },
    storeState: { stores: [], isLoading: false }
  },
  applyMiddleware(middleware, sagaMiddleware)
);
sagaMiddleware.run(productWatchers);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
    );
  }
}


