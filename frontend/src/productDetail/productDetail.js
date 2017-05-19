import * as ReactRedux from 'react-redux';import React from 'react';
import * as actions from './productDetail.actions';


class productDetail extends React.Component {
  componentDidMount() {
    this.props.fetchData(this.props.params.id)
  }


render() {


return (
  <div>
  <center>
  
  <h1>  {this.props.description.name}
</h1>

  <br/>
  <img src={this.props.description.image_path}/>

  <div className="product-description">
  {this.props.description.description}
  </div>

  <br/>
  <p> Price: ${this.props.description.price} </p>
  <button> Add to Cart </button>
  </center>
   </div>
 );
}
}



const productDetailContainer = ReactRedux.connect(
  state => state.detail,
  actions
)(productDetail);

export default productDetailContainer;
