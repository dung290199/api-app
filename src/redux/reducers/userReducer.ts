import { USERS_LOADED, USER_LOADED, USER_CREATE, USER_DELETE, USER_UPDATE } from '../type';

const initialState = {
  list: [],
  user: null,
};

const userReducer = (state = initialState, action: any) => {
  switch( action.type ) {
    case USERS_LOADED:
      return Object.assign({}, state, {
        list: action.payload
      });
    case USER_LOADED:
      console.log("action: ", action.payload);
      return Object.assign({}, state, {
        user: action.payload
      });
    case USER_CREATE:
    case USER_UPDATE:
      return Object.assign({}, state, {
        list: [
          ...state.list,
          action.payload
        ]
      })
    case USER_DELETE:
      const newList = state.list.filter((user: any) => user.id !== action.payload);
      return Object.assign({}, state, {
        list: newList
      })
    default:
      return state;
  }
}

export default userReducer;