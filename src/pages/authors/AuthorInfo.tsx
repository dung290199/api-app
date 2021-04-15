import React, { useState, FC, useEffect, Props } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthor, deleteAuthor } from '../../redux/actions/authorAction';
import { Redirect, Link } from 'react-router-dom';

const AuthorInfo: FC<{match: any}> = (props) => {

  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.authReducer.token);
  const isLogin = useSelector((state: any) => state.authReducer.isLogin);
  const author = useSelector((state: any) => state.authorReducer.author)

  const content = (isLogin && author)
            ? (
              <>
                <div>Name: {author.name}</div>
                <div>Website: {author.website}</div>
                <div> Birthday: {author.birthday}</div>
                <ul>
                  {author.books.map((book: any) => {
                    <li>{book.name}</li>
                  })}
                </ul>
                <Link to={{ pathname: `/authors/edit/${+props.match.params.id}` }}>Edit</Link>
                <Link to="/authors/all" onClick={() => dispatch(deleteAuthor(props, token, +props.match.params.id))}>Delete</Link>
              </>
            )
            : isLogin
              ? <p>There is no author!!</p>
              : <Redirect to="/" />;

  // console.log("props: ", props.match.params);

  useEffect(() => {
    dispatch(getAuthor(token, parseInt(props.match.params.id)));
    console.log("loading");
  }, [dispatch]);

  return (
    <>
      <h1>AuthorInfo</h1>
      {content}
    </>
  );
};

export default AuthorInfo;