// import './index.css';

// Standard React/Redux imports
import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import ReduxThunk from 'redux-thunk';

// React Router stuff

import { Router, Route, Link, IndexLink, IndexRoute, hashHistory } from 'react-router';


// import all components and their reducers here

import productListingReducer from './productListing/productListing.reducer';
import productListingContainer from './productListing/productListing';
import productDetailReducer from './productDetail/productDetail.reducer';
import productDetailContainer from './productDetail/productDetail';
import userSignupReducer from './userSignup/userSignup.reducer';
import userSignupContainer from './userSignup/userSignup';
import userLoginReducer from './userLogin/userLogin.reducer';
import userLoginContainer from './userLogin/userLogin';
// import addCartReducer from './addCart/addCart.reducer';
// import addCartContainer from './addCart/addCart';
import shoppingCartReducer from './shoppingCart/shoppingCart.reducer';
import shoppingCartContainer from './shoppingCart/shoppingCart';
// import checkoutReducer from './checkOut/checkOut.reducer';
// import checkoutContainer from './checkOut/checkOut';

const reducer=Redux.combineReducers({
  detail: productDetailReducer,
  listing: productListingReducer,
  signup: userSignupReducer,
  login: userLoginReducer,
  shoppingCart: shoppingCartReducer
});

const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  Redux.applyMiddleware(ReduxThunk)
);
class AppLayout extends React.Component {
  render() {
    return (
      <div>
      <div className="navbar">

    <IndexLink to="/" activeClassName="active">
      Home </IndexLink>
    <Link to="/Login" activeClassName="active">
      Login </Link>
    <Link to="/SignUp" activeClassName= "active">
      SignUp </Link>

     <Link to="/shopping_cart" activeClassName= "active"> ShoppingCart</Link>
     </div>
      <div className="content">
        {this.props.children}
      </div>
</div>
    )
  }
}


ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={AppLayout}>
      <IndexRoute component={productListingContainer}/>
      <Route path="/productDetail/:id" component={productDetailContainer}/>
      <Route path="/Login" component={userLoginContainer}/>
      <Route path="/SignUp" component={userSignupContainer}/>
      <Route path="/shopping_cart" component={shoppingCartContainer}/>
      </Route>
    </Router>
    </ReactRedux.Provider>,
  document.getElementById('root')
);
