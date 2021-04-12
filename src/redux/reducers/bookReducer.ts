import { BOOKS_LOADED, BOOK_CREATE, BOOK_DELETE, BOOK_LOADED, BOOK_UPDATE } from '../type';

const initialState = {
  list: [],
  book: null,
};

const bookReducer = (state = initialState, action: any) => {
  switch( action.type ) {
    case BOOKS_LOADED:
      return Object.assign({}, state, {
        list: action.payload
      });
    case BOOK_LOADED:
      return Object.assign({}, state, {
        book: action.payload
      });
    case BOOK_UPDATE:
      return Object.assign({}, state, {
        list: [
          ...state.list,
          action.payload
        ]
      })
    case BOOK_CREATE:
    case BOOK_DELETE:
    default:
      return state;
  }
}

export default bookReducer;