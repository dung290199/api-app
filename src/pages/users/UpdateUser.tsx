import React, { useState, FC, useEffect } from 'react';
import { updateUser, getUser } from '../../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import store from '../../redux/store';

const UpdateUser: FC<{match: any}> = (props) => {

  const dispatch = useDispatch();
  const isLogin = useSelector((state: any) => state.authReducer.isLogin)
  const token = useSelector((state: any) => state.authReducer.token);
  const list = useSelector((state: any) => state.userReducer.list);
  const data = useSelector((state: any) => state.userReducer.user);
  const [user, setUser] = useState(
    {
      name: "",
      username: "",
      password: "",
      role: ""
    }
  );

  const { name, username, password, role } = data ? data : "";

  const handleUserChange = (e: React.ChangeEvent<any>) => {
    const {name, value} = e.target;

    setUser({
      ...user,
      [name]: value
    });
  }

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    console.log("user: ", user);

    dispatch(updateUser(JSON.stringify(user), props, token, +props.match.params.id));
  }

  useEffect(() => {
    dispatch(getUser(token, list, +props.match.params.id))
  }, [dispatch]);

  console.log("UpdateUser");
  console.log("store: ", store.getState());

  return (
    <>
      {
        !isLogin
          ? <Redirect to="/" />
          : (
            <form onSubmit={handleSubmit}>
              <div>
                <label>
                  Name:
                  <input type="text" name="name" placeholder={name} onChange={handleUserChange}/>
                </label><br/>
                <label>
                  Username:
                  <input type="text" name="username" placeholder={username} onChange={handleUserChange}/>
                </label><br/>
                <label>
                  Password:
                  <input type="text" name="password" placeholder={password} onChange={handleUserChange}/>
                </label><br/>
                <label>
                  Role:
                  <input type="text" name="role" placeholder={role} onChange={handleUserChange}/>
                </label><br/>
              </div>
              <button type="submit">SAVE</button>
            </form> 
          )
      }
    </>
  )
};

export default UpdateUser;