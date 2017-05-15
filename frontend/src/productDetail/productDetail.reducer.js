const INITIAL_STATE = {
  description: ""
};

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === "displayDescription"){
    return Object.assign({}, state, {
      description: action.payload
    })
  }
  return state;
}
