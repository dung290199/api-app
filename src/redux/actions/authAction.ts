import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../type';
import axios from '../../axios';

export const login = ( data: any, props: any ) => ( dispatch: any ) => {
  console.log("login");
  return axios.post(
    '/auths/login',
    {
      username: data.username,
      password: data.password
    })
    .then(res => {
      console.log("login success");
      // console.log("data ", res.data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', res.data.user);
      localStorage.setItem('isLogin', 'true');
      
      dispatch(
        {
          type: LOGIN_SUCCESS,
          payload: {
            token: res.data.token,
            user: res.data.user
          }
        }
      )
      props.history.push('/home');
    })
    .catch(err => dispatch(
      {
        type: LOGIN_FAIL,
        payload: "Login fail!"
      }
    ));
};

export const logout = () => (dispatch: any) => {
  localStorage.clear();
  // props.history.push('/');
  return dispatch({
    type: LOGOUT
  })
}
