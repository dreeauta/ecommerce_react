import $ from 'jquery';

export function displayCart(data){
  return {
    type: 'displayCart',
    payload: data
  }
}


export function pageError(resp) {
  let error = (resp && resp.responseJSON && resp.responseJSON.message) || 'Fix me!';
  return {
    type: 'page_error',
    error: error
  };
}

export function fetchShoppingCart(title){
  let asyncAction = function(dispatch) {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:4000/api/shoppingcart',
      data: JSON
    })
    .then(data => dispatch(displayCart(data)))
    .catch(resp => dispatch(pageError(resp)))
  };
  return asyncAction;
}
