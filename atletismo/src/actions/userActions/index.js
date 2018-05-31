import { ADD_ARTICLE} from "../../constants/action-types";


export const userActions={
  login,
  logout,
  register
};

function login(email, password){
  return dispatch => {
    dispatch(request({email}));


  }
}
