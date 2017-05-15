import $ from 'jquery';

export function displayImages(data){
  return {
    type: 'displayImages',
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


export function fetchImages(title){
  let asyncAction = function(dispatch) {
    $.ajax({
      method:'GET',
      url: 'http://localhost:4000/api/products'
    })
    .then(data => dispatch(displayImages(data)))
    .catch(resp => dispatch(pageError(resp)))
  };
  return asyncAction;
}
