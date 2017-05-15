const INITIAL_STATE = {
  username: "",
  password: "",
  firstname: "",
  lastname: "",
  email: ""
};


export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'onChange'){
    return Object.assign({}, state, {
      [action.name]: action.payload
    })
  }

  else if (action.type === 'submit') {
  }
  return state;
}
