import $ from 'jquery';

export function displayDescription(data) {
  return {
    type: 'displayDescription',
    payload: data
  }
}

export function pageError(resp){
  let error = (resp && resp.responseJSON && resp.responseJSON.message) || 'Help!';
  return {
    type: 'page_error',
    error: error
  };
}

export function fetchData(id) {
  let asyncAction = function(dispatch) {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:4000/api/product/' + id
    })
    .then(data => dispatch(displayDescription(data)))
    .catch(resp => dispatch(pageError(resp)))
  }
  return asyncAction;
}
