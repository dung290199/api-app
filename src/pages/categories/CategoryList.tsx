import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { getAllCategories } from '../../redux/actions/categoryAction';

const CategoryList: FC = (props) => {
  const dispatch = useDispatch();

  const token:String = useSelector((state: any) => state.authReducer.token);
  const list = useSelector((state: any) => state.categoryReducer.list);
  const isLogin = useSelector((state: any) => state.authReducer.isLogin);

  const content = (list.length && isLogin)
                    ? list.map((Category: any) => {
                      return (
                        <div>
                          <Link to={ {pathname: `/categories/${Category.id}`} }>{Category.name}</Link>
                        </div>
                      );
                    })
                    : (!isLogin)
                      ? <Redirect to="/" />
                      : <p>There is no Category!!</p>;

  // console.log("content: ", content);

  useEffect(() => {
    dispatch(getAllCategories(token));
    console.log("loading-");
  }, [dispatch]);

  return (
    <>
      <h1>CategoryList</h1>
      {content}
    </>
  );
};

export default CategoryList;