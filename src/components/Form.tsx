import React, { useState, FC } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/authAction';
import store from '../redux/store';

const Form: FC = (props) => {

  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const dispatch = useDispatch();

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
    <form onSubmit={handleSubmit} >
      <div>
        <label>
        username:
        <input type="text" name="username" value={user.username} onInput={handleChange} />
      </label>
      <label>
        password:
        <input type="text" name="password" value={user.password} onInput={handleChange} />
      </label>
    </div>
      <button type="submit">SAVE</button>
    </form>
  );
};

export default Form;