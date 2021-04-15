import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/authAction';

const NavBar = () => {

  const dispatch = useDispatch();
  const isLogin = useSelector((state: any) => state.authReducer.isLogin)

  return (
    <>
      {
        isLogin
          ? <a href="/" onClick={() => dispatch(logout())} >Logout</a>
          : <p> You have to login!!!!!</p>
      }
    </>
  );
}

export default NavBar;