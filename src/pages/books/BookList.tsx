import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { getAllBook } from '../../redux/actions/bookAction';

const BookList: FC = (props) => {
  const dispatch = useDispatch();

  const token:String = useSelector((state: any) => state.authReducer.token);
  const list = useSelector((state: any) => state.bookReducer.list);
  const isLogin = useSelector((state: any) => state.authReducer.isLogin);
  const [loading, setLoading] = useState(true);

  const content = (list.length && isLogin)
                    ? list.map((book: any) => {
                      return <Link to={ {pathname: `/books/${book.id}`} }>{book.name}</Link>
                    })
                    : (!isLogin)
                      ? <Redirect to="/" />
                      : <p>There is no book!!</p>;

  // console.log("content: ", content);

  useEffect(() => {
    dispatch(getAllBook(token));
    console.log("loading-");
  }, [dispatch]);

  return (
    <>
      <h1>BookList</h1>
      {content}
    </>
  );
};

export default BookList;