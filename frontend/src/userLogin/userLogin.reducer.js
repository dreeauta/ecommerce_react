const INITIAL_STATE = {
  username: "",
  password: "",
  token: ""
};


export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'loginChange'){
    return Object.assign({}, state, {
      [action.name]: action.payload
    })
  }

  else if (action.type === 'submitLogin'){
    return Object.assign({}, state, {
      username: action.payload.username,
      password: action.payload.password,
      token: action.payload.auth_token
    })
  }

  return state;
}
