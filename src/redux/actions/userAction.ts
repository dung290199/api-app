import axios from '../../axios';
import { USERS_LOADED, USER_LOADED, USER_CREATE, USER_DELETE, USER_UPDATE } from '../type';

export const getAllUser = (token: String) => (dispatch: any) => {
  return axios.get(
    '/users?name=u&pageSize=5&pageNumber=1&sortBy=username&descending=true',
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }
    )
    .then(res => {
      // console.log("All User data", res.data);
      return dispatch({
      type: USERS_LOADED,
      payload: res.data.data
    })})
    .catch(err => console.log(err));
}

export const getUser = (token: String, list: [], id: number) => (dispatch: any) => {
  const user = list.filter((user: any) => user.id === id);

  return dispatch({
    type: USER_LOADED,
    payload: user[0]
  });
}

export const createUser = (data: any, props: any, token: String) => (dispatch: any) => {
  return axios.post(
    '/users',
    data,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf8'
      }
    })
      .then(res => {
        dispatch({
          type: USER_CREATE,
          payload: data
        });
        props.history.push("/users/all");
      })
      .catch(err => console.log(err));
}

export const updateUser = (data: any, props: any, token: String, id: number) => (dispatch: any) => {
  return axios.put(
    `/users/${id}`,
    data,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf8'
      }
    })
      .then(res => {
        dispatch({
          type: USER_UPDATE,
          payload: data
        });
        props.history.push("/users/all");
      })
      .catch(err => console.log(err));
}

export const deleteUser = (props: any, token: String, id: number) => (dispatch: any) => {
  return axios.delete(
    `/users/${id}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  )
      .then(res => {
        dispatch({
          type: USER_DELETE,
          payload: id
        });
        props.history.push("/users/all");
      })
      .catch(err => console.log(err));
}