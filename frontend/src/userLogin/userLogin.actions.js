import $ from 'jquery';


export function loginChange(data, propName){
  return {
    type: 'loginChange',
    payload: data,
    name: propName
  }
}




export function submitLogin(username, password){
  let asyncAction = function(dispatch) {
    console.log(username, password);
    $.ajax({
      method: 'POST',
      url: 'http://localhost:4000/api/user/login',
      data: JSON.stringify({
        username: username,
        password: password
      }),
      contentType: 'application/json'
    })
    .then(data => dispatch({ type: 'submitLogin', payload: data}))
  }
  return asyncAction
}
