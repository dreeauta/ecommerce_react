const INITIAL_STATE = {
  cart: [],
  error: null
}

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'displayCart'){
    return Object.assign({}, state, {
      cart: action.payload
    });
  }
  if (action.type === 'page_error') {
    return Object.assign({}, state, {
      error: action.error
    });
  }

  return state;
}
