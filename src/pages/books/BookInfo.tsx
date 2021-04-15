import React, { useState, FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBook, deleteBook } from '../../redux/actions/bookAction';
import { Redirect, Link } from 'react-router-dom';

const BookInfo: FC<{match: any}> = (props) => {

  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.authReducer.token);
  const isLogin = useSelector((state: any) => state.authReducer.isLogin);
  const book = useSelector((state: any) => state.bookReducer.book)

  const content = (isLogin && book)
            ? (
              <>
                <div>Name: {book.name}</div>
                <div>Author: {book.author.name}</div>
                <Link to={{ pathname: `/books/edit/${book.id}` }} >Edit</Link><br/>
                <Link to="/books/all/"  onClick={() => dispatch(deleteBook(props, token, +props.match.params.id))} >Delete</Link><br/>
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