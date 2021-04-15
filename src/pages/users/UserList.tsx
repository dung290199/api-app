import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { getAllUser, deleteUser } from '../../redux/actions/userAction';

const UserList: FC<{match: any}> = (props) => {
  const dispatch = useDispatch();

  const token:String = useSelector((state: any) => state.authReducer.token);
  const list = useSelector((state: any) => state.userReducer.list);
  const isLogin = useSelector((state: any) => state.authReducer.isLogin);

  const content = (list.length && isLogin)
                    ? list.map((user: any) => {
                      return (
                        <div>
                          <Link to={ {pathname: `/users/edit/${user.id}`} }>{user.name}</Link>
                          <button onClick={() => dispatch(deleteUser(props, token, user.id))}>Delete</button>
                        </div>
                      );
                    })
                    : (!isLogin)
                      ? <Redirect to="/" />
                      : <p>There is no User!!</p>;

  // console.log("content: ", content);

  useEffect(() => {
    dispatch(getAllUser(token));
    console.log("loading-");
  }, [dispatch]);

  return (
    <>
      <h1>UserList</h1>
      {content}
    </>
  );
};

export default UserList;