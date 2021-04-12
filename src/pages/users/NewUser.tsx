import React, { useState, FC, useEffect } from 'react';
import { createUser } from '../../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";

const NewUser: FC = (props) => {

  const dispatch = useDispatch();
  const isLogin = useSelector((state: any) => state.authReducer.isLogin)
  const token = useSelector((state: any) => state.authReducer.token);
  const [user, setUser] = useState(
    {
      name: "",
      username: "",
      password: "",
      role: ""
    }
  );

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
    dispatch(createUser(JSON.stringify(user), props, token));
  }

  console.log("newUser");

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
                  <input type="text" name="name" onChange={handleUserChange}/>
                </label><br/>
                <label>
                  Username:
                  <input type="text" name="username" onChange={handleUserChange}/>
                </label><br/>
                <label>
                  Password:
                  <input type="text" name="password" onChange={handleUserChange}/>
                </label><br/>
                <label>
                  Role:
                  <input type="text" name="role" onChange={handleUserChange}/>
                </label><br/>
              </div>
              <button type="submit">SAVE</button>
            </form> 
          )
      }
    </>
  )
};

export default NewUser;