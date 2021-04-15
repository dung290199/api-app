import React, { useState, FC, useEffect, Props } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategory, deleteCategory } from '../../redux/actions/categoryAction';
import { Redirect, Link } from 'react-router-dom';

const CategoryInfo: FC<{match: any}> = (props) => {

  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.authReducer.token);
  const isLogin = useSelector((state: any) => state.authReducer.isLogin);
  const category = useSelector((state: any) => state.categoryReducer.category)

  // const handleOnClick = () => {
  //   <Redirect  />;
  // }

  const content = (isLogin && category)
            ? (
              <>
                <div>ID: {category.id}</div>
                <div>Name: {category.name}</div>
                <div>Description: {category.description}</div>
                <Link to={{ pathname: `/categories/edit/${+props.match.params.id}` }}> Edit </Link>
                <Link to="/categories/all" onClick={() => dispatch(deleteCategory(props, token, +props.match.parms.id))}> Delete </Link>
              </>
            )
            : isLogin
              ? <p>There is no Category!!</p>
              : <Redirect to="/" />;

  // console.log("props: ", props.match.params);
  console.log("category: ", category);

  useEffect(() => {
    dispatch(getCategory(token, parseInt(props.match.params.id)));
    console.log("loading");
  }, [dispatch]);

  return (
    <>
      <h1>CategoryInfo</h1>
      {content}
    </>
  );
};

export default CategoryInfo;