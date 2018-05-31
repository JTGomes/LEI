import { ADD_ARTICLE } from "../constants/action-types";

const initialState = {
  user: undefined,
  userRole: undefined,
  jwt: undefined
};

const rootReducer = (state = initialState, action) => {
  switch(action.type){
    case USER_LOGIN:
      return { ...state, articles: [...state.articles, action.payload] };
    default:
      return state;
  }
}

export default rootReducer;
