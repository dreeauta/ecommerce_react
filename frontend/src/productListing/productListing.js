import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './productListing.actions';
import { Link } from 'react-router';


class productListing extends React.Component {
  componentDidMount() {
    this.props.fetchImages(this.props.params.data)
  }


  render() {
    let loginName;
    let token = this.props.login.token;
    console.log(this.props);
    if (token) {
      loginName = this.props.login.firstname;
    }

    let mapImages;
    if (this.props.listing.allImages) {
      mapImages = this.props.listing.allImages.map((input,idx) => <Link to={"/productDetail/"+ input.id} key={idx} className="allImages" >  <img src={input.image_path}/></Link> );
    }

    return (
    <div>
    <center>
    { loginName }
    <h1> Big Things Happening! </h1>
      <p> { mapImages } </p>
      </center>


    </div>
  );
  }
}

const productListingContainer = ReactRedux.connect(
  state => state,
  // removed state.listing, to access token, now props become this.props.listing.allImages
  //  state.listing,
  actions
)(productListing);

export default productListingContainer;
