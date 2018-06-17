import {  LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from '../actions/userActions'
import jwt from 'jsonwebtoken';
const initialState = {
  user: undefined,
  userRole: undefined,
  isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
  switch(action.type){
    case LOGIN_SUCCESS:
        const decoded = jwt.decode(action.token)
        return Object.assign({}, state, {
          user: decoded.userId,
          userRole: decoded.userRole,
          isAuthenticated: true,
          errorMessage: ''
        })
    case LOGIN_FAILURE:
        let message = action.message
        if(action.message.includes('404')){
          message = 'Problema no servidor. Pedimos desculpa.'
        }
        return Object.assign({}, state, {
          isAuthenticated: false,
          errorMessage: message
        })
    case LOGOUT_SUCCESS:
        return Object.assign({}, state, {
          user: undefined,
          userRole: undefined,
          isAuthenticated: false
        })
    default:
        return state;
  }
}








export default userReducer;
