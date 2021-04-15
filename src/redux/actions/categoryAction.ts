import axios from '../../axios';
import { CATEGORIES_LOADED, CATEGORY_CREATE, CATEGORY_LOADED, CATEGORY_DELETE, CATEGORY_UPDATE } from '../type';

export const getAllCategories = (token: String) => (dispatch: any) => {
  return axios.get(
    '/categories/',
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }
    )
    .then(res => {
      return dispatch({
      type: CATEGORIES_LOADED,
      payload: res.data
    })})
    .catch(err => console.log(err));
}

export const getCategory = (token: String, id: number) => (dispatch: any) => {
  return axios.get(
    `/categories/${id}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }
    )
    .then(res => {
      return dispatch({
      type: CATEGORY_LOADED,
      payload: res.data
    })})
    .catch(err => console.log(err));
}

export const createCategory = (data: any, props: any, token: String) => (dispatch: any) => {
  return axios.post(
    '/categories/',
    data,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf8'
      }
    })
      .then(res => {
        dispatch({
          type: CATEGORY_CREATE,
          payload: data
        });
        props.history.push("/categories/all");
      })
      .catch(err => console.log(err));
}

export const updateCategory = (data: any, props: any, token: String, id: number) => (dispatch: any) => {
  return axios.put(
    `/categories/${id}`,
    data,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf8'
      }
    })
      .then(res => {
        dispatch({
          type: CATEGORY_UPDATE,
          payload: data
        });
        props.history.push("/categories/all");
      })
      .catch(err => console.log(err));
}

export const deleteCategory = (props: any, token: String, id: number) => (dispatch: any) => {
  return axios.delete(
    `/categories/${id}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        dispatch({
          type: CATEGORY_DELETE,
          payload: id
        });
        props.history.push("/categories/all");
      })
      .catch(err => console.log(err));
}