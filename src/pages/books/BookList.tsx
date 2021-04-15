import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { getAllBook } from '../../redux/actions/bookAction';
import PaginationComponent from '../../components/PaginationComponent';

const BookList: FC = (props) => {
  const dispatch = useDispatch();

  const token: string = useSelector((state: any) => state.authReducer.token);
  // const currentPage: number = useSelector((state: any) => state.authReducer.pagination.currentPage);
  const list = useSelector((state: any) => state.bookReducer.list);
  const isLogin = useSelector((state: any) => state.authReducer.isLogin);

  const pagination = useSelector((state: any) => state.bookReducer.pagination);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const { currentPage, totalPages, pageSize, totalItems } = pagination ? pagination : 1;

  if ( pagination && currentPage !== pagination.currentPage ) {
    setCurrentPage(pagination.currentPage);
    setTotalPages(pagination.totalPages);
  }

  console.log("pagination: ", pagination);

  // const [currentPage, setCurrentPage] = useState(1);
  
  console.log("booklist props: ", props);

  const content = (list.length && isLogin)
                    ? list.map((book: any) => {
                      return (
                        <>
                          <div>
                            <Link to={ {pathname: `/books/${book.id}`} }>{book.name}</Link>
                          </div>
                        </>
                      )
                    })
                    : (!isLogin)
                      ? <Redirect to="/" />
                      : <p>There is no book!!</p>;

  // console.log("content: ", content);

  useEffect(() => {
    console.log("currentPage: ", currentPage);
    dispatch(getAllBook(token, currentPage.toString()));
    console.log("loading-");
  }, [dispatch]);
  
  return (
    <>
      <h1>BookList</h1>
      {content}
      <PaginationComponent totalPages={totalPages} currentPage={currentPage} token={token} />
    </>
  );
};

export default BookList;