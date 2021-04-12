import axios from '../../axios';
import { AUTHORS_LOADED, AUTHOR_CREATE, AUTHOR_LOADED, AUTHOR_DELETE, AUTHOR_UPDATE } from '../type';

export const getAllAuthors = (token: String) => (dispatch: any) => {
  return axios.get(
    '/authors',
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }
    )
    .then(res => {
      return dispatch({
      type: AUTHORS_LOADED,
      payload: res.data
    })})
    .catch(err => console.log(err));
}

export const getAuthor = (token: String, id: number) => (dispatch: any) => {
  return axios.get(
    `/authors/${id}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }
    )
    .then(res => {
      return dispatch({
      type: AUTHOR_LOADED,
      payload: res.data
    })})
    .catch(err => console.log(err));
}

export const createAuthor = (data: any, props: any, token: String) => (dispatch: any) => {
  return axios.post(
    '/authors/',
    data,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf8'
      }
    })
      .then(res => {
        dispatch({
          type: AUTHOR_CREATE,
          payload: data
        });
        props.history.push("/authors/all");
      })
      .catch(err => console.log(err));
}

export const updateAuthor = (data: any, props: any, token: String, id: number) => (dispatch: any) => {
  return axios.put(
    `/authors/${id}`,
    data,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf8'
      }
    })
      .then(res => {
        dispatch({
          type: AUTHOR_UPDATE,
          payload: data
        });
        props.history.push("/authors/all");
      })
      .catch(err => console.log(err));
}

export const deleteAuthor = (props: any, token: String, id: number) => (dispatch: any) => {
  return axios.delete(
    `/authors/${id}`,
    {
      headers: {
        'Authentication': `Bear ${token}`,
      }
    })
      .then(res => {
        dispatch({
          type: AUTHOR_DELETE
        });
        props.history.push("/authors/all");
      })
      .catch(err => console.log(err));
}