import { CATEGORIES_LOADED, CATEGORY_CREATE, CATEGORY_LOADED, CATEGORY_DELETE, CATEGORY_UPDATE } from '../type';

const initialState = {
  list: [],
  category: null,
};

const categoryReducer = (state = initialState, action: any) => {
  switch( action.type ) {
    case CATEGORIES_LOADED:
      return Object.assign({}, state, {
        list: action.payload
      });
    case CATEGORY_LOADED:
      return Object.assign({}, state, {
        category: action.payload
      });
    case CATEGORY_UPDATE:
      return Object.assign({}, state, {
        list: [
          ...state.list,
          action.payload
        ]
      })
    case CATEGORY_CREATE:
    case CATEGORY_DELETE:
    default:
      return state;
  }
}

export default categoryReducer;