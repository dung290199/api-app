import { LOGIN_SUCCESS, LOGIN_FAIL } from '../type';

const initialState: any = {
  token: null,
  user: null,
  isLogin: false
};

const authReducer = (state = initialState, action: any) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        ...action.payload,
          isLogin: true
      });
    case LOGIN_FAIL:
      return Object.assign({}, state, initialState);
  }

  return state;
}

export default authReducer;