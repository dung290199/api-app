import React, { useState, FC, useEffect } from 'react';
import { createAuthor } from '../../redux/actions/authorAction';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";

const NewAuthor: FC = (props) => {

  const dispatch = useDispatch();
  const isLogin = useSelector((state: any) => state.authReducer.isLogin)
  const token = useSelector((state: any) => state.authReducer.token);
  const [author, setAuthor] = useState(
    {
      name: "",
      website: "",
      birthday: "",
      cover: ""
    }
  );

  const handleAuthorChange = (e: React.ChangeEvent<any>) => {
    const {name, value} = e.target;
    setAuthor({
      ...author,
      [name]: value
    });
  }

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    console.log("Author: ", author);
    dispatch(createAuthor(JSON.stringify(author), props, token));
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
                  <input type="text" name="name" onChange={handleAuthorChange}/>
                </label><br/>
                <label>
                  Website:
                  <input type="text" name="website" onChange={handleAuthorChange}/>
                </label><br/>
                <label>
                  Birthday:
                  <input type="text" name="birthday" onChange={handleAuthorChange}/>
                </label><br/>
                <label>
                  Cover:
                  <input type="text" name="cover" onChange={handleAuthorChange}/>
                </label><br/>
              </div>
              <button type="submit">SAVE</button>
            </form> 
          )
      }
    </>
  )
};

export default NewAuthor;