import { AUTHORS_LOADED, AUTHOR_CREATE, AUTHOR_LOADED, AUTHOR_DELETE, AUTHOR_UPDATE } from '../type';

const initialState = {
  list: [],
  author: null,
};

const authorReducer = (state = initialState, action: any) => {
  switch( action.type ) {
    case AUTHORS_LOADED:
      return Object.assign({}, state, {
        list: action.payload
      });
    case AUTHOR_LOADED:
      return Object.assign({}, state, {
        author: action.payload
      });
    case AUTHOR_UPDATE:
      return Object.assign({}, state, {
        list: [
          ...state.list,
          action.payload
        ]
      })
    case AUTHOR_CREATE:
    case AUTHOR_DELETE:
    default:
      return state;
  }
}

export default authorReducer;