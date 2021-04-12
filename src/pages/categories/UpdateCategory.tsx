import React, { useState, FC, useEffect } from 'react';
import { updateCategory } from '../../redux/actions/categoryAction';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import store from '../../redux/store';

const UpdateUser: FC<{match: any}> = (props) => {

  const dispatch = useDispatch();
  const isLogin = useSelector((state: any) => state.authReducer.isLogin)
  const token = useSelector((state: any) => state.authReducer.token);
  const list = useSelector((state: any) => state.categoryReducer.list);
  const data = useSelector((state: any) => state.categoryReducer.category);
  const [category, setCategory] = useState(
    {
      name: "",
      description: ""
    }
  );

  const { name, description } = data ? data : "";

  const handleUserChange = (e: React.ChangeEvent<any>) => {
    const {name, value} = e.target;

    setCategory({
      ...category,
      [name]: value
    });
  }

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    dispatch(updateCategory(JSON.stringify(category), props, token, +props.match.params.id));
  }

  // useEffect(() => {
  //   dispatch(getUser(token, list, +props.match.params.id))
  // }, [dispatch]);

  // console.log("UpdateUser");
  // console.log("store: ", store.getState());

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
                  <input type="text" name="name" placeholder={name} onChange={handleUserChange}/>
                </label><br/>
                <label>
                  Description:
                  <input type="text" name="description" placeholder={description} onChange={handleUserChange}/>
                </label><br/>
              </div>
              <button type="submit">SAVE</button>
            </form> 
          )
      }
    </>
  )
};

export default UpdateUser;