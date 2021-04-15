import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../type';

const initialState: any = {
  token: localStorage.getItem('token'),
  user: localStorage.getItem('user'),
  isLogin: localStorage.getItem('isLogin') === 'true'
};

const authReducer = (state = initialState, action: any) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        ...action.payload,
          isLogin: true
      });
    case LOGIN_FAIL:
    case LOGOUT: 
      return Object.assign({}, state, {
        token: null,
        user: null,
        isLogin: false
      });
  }

  return state;
}

export default authReducer;