import axios from '../../axios';
import { BOOKS_LOADED, BOOK_CREATE, BOOK_LOADED, BOOK_DELETE, BOOK_UPDATE } from '../type';

export const getAllBook = (token: String) => (dispatch: any) => {
  return axios.get(
    '/books?bookName=A&authorId=411&categoryIds=71,41,11&pageSize=10&pageNumber=1&sortBy=author&descending=true',
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }
    )
    .then(res => {
      // console.log("All book data", res.data);
      return dispatch({
      type: BOOKS_LOADED,
      payload: res.data.data
    })})
    .catch(err => console.log(err));
}

export const getBook = (token: String, id: number) => (dispatch: any) => {
  return axios.get(
    `/books/${id}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }
    )
    .then(res => {
      // console.log("All book data", res.data);
      return dispatch({
      type: BOOK_LOADED,
      payload: res.data
    })})
    .catch(err => console.log(err));
}

export const createBook = (data: any, props: any, token: String) => (dispatch: any) => {
  return axios.post(
    '/books/',
    data,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf8'
      }
    })
      .then(res => {
        dispatch({
          type: BOOK_CREATE,
          payload: data
        });
        props.history.push("/books/all");
      })
      .catch(err => console.log(err));
}

export const updateBook = (data: any, props: any, token: String, id: number) => (dispatch: any) => {
  return axios.put(
    `/books/${id}`,
    data,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf8'
      }
    })
      .then(res => {
        dispatch({
          type: BOOK_UPDATE,
          payload: data
        });
        props.history.push("/books/all");
      })
      .catch(err => console.log(err));
}

export const deleteBook = (data: any, props: any, token: String, id: number) => (dispatch: any) => {
  return axios.delete(`/books/${id}`)
      .then(res => {
        dispatch({
          type: BOOK_DELETE
        });
        props.history.push("/books/all");
      })
      .catch(err => console.log(err));
}