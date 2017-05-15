const INITIAL_STATE = {
  allImages: [],
  token: ""
}

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'displayImages') {
    return Object.assign({}, state, {
      allImages: action.payload
    });
  }
  if (action.type === 'page_error'){
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
}
