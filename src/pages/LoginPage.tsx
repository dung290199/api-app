import React, { useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authAction';
import store from '../redux/store';
import { Redirect } from 'react-router-dom';

const Form: FC = (props) => {

  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const dispatch = useDispatch();
  const isLogin = useSelector((state: any) => state.authReducer.isLogin)

  function handleChange(e: React.ChangeEvent<any>): void {
    const { name, value } = e.target;
    console.log(name, value);
    setUser(user => ({ ...user, [name]: value }))
  }

  function handleSubmit(e: React.ChangeEvent<any>): void {
    e.preventDefault();

    if (user.username && user.password) {
      dispatch(login(user, props));
    }

    setTimeout(() => console.log(store.getState()), 7000);
  }

  return (
    <>
      {
        !isLogin
          ? (
            <form onSubmit={handleSubmit} >
              <div>
                <div>
                  <label>username:</label>
                  <input type="text" name="username" value={user.username} onInput={handleChange} />
                </div>
                <div>
                  <label>password:</label>
                  <input type="text" name="password" value={user.password} onInput={handleChange} />
                </div>
              </div>
              <button type="submit">LOGIN</button>
            </form>
          )
          : <Redirect to="/home" />
      }
    </>
  );
};

export default Form;