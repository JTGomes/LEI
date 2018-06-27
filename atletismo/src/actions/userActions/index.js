import axios from 'axios';
import {history} from '../../constants/history';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const userActions= {
  loginUser,
  logoutUser,
  login_action,
}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';


function login_action(token){
  return  {
    type: LOGIN_SUCCESS,
    isAuthenticated: true,
    token: token
  }}

function loginUser(creds) {
  return dispatch => {
    return axios.post('http://localhost:3000/api/Users/login', creds)
          .then(res => {
            const token = res.data;
            sessionStorage.setItem('jwtToken',token);
            dispatch(login_action(token));
            history.push('/');
          })
         .catch(error =>{
           error.response ?
              dispatch(login_error(error.response.data.error.message))
              : dispatch(login_error(error.message))
         })

  };





  function login_error(message) {
    return {
      type: LOGIN_FAILURE,
      isAuthenticated: false,
      message
    }
  }
}


function logoutUser() {
  return dispatch => {
    sessionStorage.removeItem('jwtToken');
    dispatch(requestLogout());
    history.push('/');
  }

  function requestLogout() {
    return {
      type: LOGOUT_SUCCESS,
      isAuthenticated: false
    }
  }
}
