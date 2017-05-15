const INITIAL_STATE = {
  username: "",
  password: "",
  firstname: "",
  lastname: "",
  email: "",
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
      password: "",
      firstname: action.payload.first_name,
      lastname: action.payload.last_name,
      email: action.payload.email,
      token: action.payload.auth_token
    })
  }

  return state;
}
