import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './shoppingCart.actions';
import { Link } from 'react-router';


class shoppingCart extends React.Component {

  render(){

  return(
    <div>

    <center>

    shopping cart

    </center>

    </div>
  );
  }
}


const shoppingCartContainer = ReactRedux.connect(
  state=> state,
  // state.shoppingCart

  actions
)(shoppingCart);

export default shoppingCartContainer;
