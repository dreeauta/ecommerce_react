import $ from 'jquery';

export function onChange(data, propName) {
  return{
    type: 'onChange',
    payload: data,
    name: propName
  }
}

export function submit(username, firstname, lastname, email, password) {
      let asyncAction = function(dispatch) {
        $.ajax({
          method: 'POST',
          url: 'http://localhost:4000/api/user/signup',
          data: JSON.stringify({
            username: username,
            password: password,
            first_name: firstname,
            last_name: lastname,
            email: email,

          }),
          contentType: 'application/json'
        })
        .then(data => dispatch({type: 'submit', payload: data}))
      }
    return asyncAction
}
