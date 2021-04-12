import React, { useState, FC, useEffect } from 'react';
import { createCategory } from '../../redux/actions/categoryAction';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";

const NewCategory: FC = (props) => {

  const dispatch = useDispatch();
  const isLogin = useSelector((state: any) => state.authReducer.isLogin)
  const token = useSelector((state: any) => state.authReducer.token);
  const [category, setCategory] = useState(
    {
      name: "",
      description: "",
    }
  );

  const handleCategoryChange = (e: React.ChangeEvent<any>) => {
    const {name, value} = e.target;
    setCategory({
      ...category,
      [name]: value
    });
  }

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    console.log("Category: ", category);
    dispatch(createCategory(JSON.stringify(category), props, token));
  }

  return (
    <>
      {
        !isLogin
          ? <Redirect to="/" />
          : (
            <form onSubmit={handleSubmit}>
              <div>
                <label>
                  Name:
                  <input type="text" name="name" onChange={handleCategoryChange}/>
                </label><br/>
                <label>
                  Description:
                  <input type="text" name="description" onChange={handleCategoryChange}/>
                </label><br/>
              </div>
              <button type="submit">SAVE</button>
            </form> 
          )
      }
    </>
  )
};

export default NewCategory;