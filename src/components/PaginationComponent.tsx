import React, { useState, useEffect, FC } from "react";
import Pagination from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBook } from '../redux/actions/bookAction';

const PaginationComponent: FC<{ totalPages: number, currentPage: number, token: string }> = (props) => {

  const dispatch = useDispatch();
  const [totalPages, setTotalPages] = useState(1);
  // const totalPages = props.totalPages;
  useEffect(() => {
    if (totalPages !== props.totalPages) {
      setTotalPages(props.totalPages);
    }
  }, [totalPages]);

  const items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === props.currentPage}
        onClick={() => dispatch(getAllBook(props.token, number.toString()))}
      >
        {number}
      </Pagination.Item>,
    );
  }
  return (
    <Pagination style={{justifyContent: "center"}}>
      <Pagination.Prev
        disabled={props.currentPage === 1}
        onClick={() => dispatch(getAllBook(props.token, (props.currentPage - 1).toString()))}
      />
      {items}
      <Pagination.Next
        disabled={props.currentPage === totalPages}
        onClick={() => dispatch(getAllBook(props.token, (props.currentPage + 1).toString()))}
      />
    </Pagination>
  );
}

export default PaginationComponent;