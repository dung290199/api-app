import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { getAllAuthors } from '../../redux/actions/authorAction';

const AuthorList: FC = (props) => {
  const dispatch = useDispatch();

  const token:String = useSelector((state: any) => state.authReducer.token);
  const list = useSelector((state: any) => state.authorReducer.list);
  const isLogin = useSelector((state: any) => state.authReducer.isLogin);

  const content = (list.length && isLogin)
                    ? list.map((author: any) => {
                      return (
                        <div>
                          <Link to={ {pathname: `/authors/${author.id}`} }>{author.name}</Link>
                        </div>
                      );
                    })
                    : (!isLogin)
                      ? <Redirect to="/" />
                      : <p>There is no author!!</p>;

  // console.log("content: ", content);

  useEffect(() => {
    dispatch(getAllAuthors(token));
    console.log("loading-");
  }, [dispatch]);

  return (
    <>
      <h1>AuthorList</h1>
      {content}
    </>
  );
};

export default AuthorList;