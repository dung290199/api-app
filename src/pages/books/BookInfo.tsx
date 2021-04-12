import React, { useState, FC, useEffect, Props } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBook } from '../../redux/actions/bookAction';
import { Redirect } from 'react-router-dom';

const BookInfo: FC<{match: any}> = (props) => {

  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.authReducer.token);
  const isLogin = useSelector((state: any) => state.authReducer.isLogin);
  const Book = useSelector((state: any) => state.BookReducer.Book)

  const content = (isLogin && Book)
            ? (
              <>
                <div>Name: {Book.name}</div>
                <div>Author: {Book.author.name}</div>
              </>
            )
            : isLogin
              ? <p>There is no Book!!</p>
              : <Redirect to="/" />;

  // console.log("props: ", props.match.params);

  useEffect(() => {
    dispatch(getBook(token, parseInt(props.match.params.id)));
    console.log("loading");
  }, [dispatch]);

  return (
    <>
      <h1>BookInfo</h1>
      {content}
    </>
  );
};

export default BookInfo;