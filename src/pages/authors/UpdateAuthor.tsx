import React, { useState, FC, useEffect } from 'react';
import { updateAuthor } from '../../redux/actions/authorAction';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import store from '../../redux/store';

const UpdateAuthor: FC<{match: any}> = (props) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: any) => state.authReducer.isLogin)
  const token = useSelector((state: any) => state.authReducer.token);
  const list = useSelector((state: any) => state.authorReducer.list);
  const data = useSelector((state: any) => state.authorReducer.author);
  const [author, setAuthor] = useState(
    {
      name: "",
      website: "",
      birthday: "",
      cover: ""
    }
  );

  const { name, website, birthday, cover } = data ? data : "";

  const handleAuthorChange = (e: React.ChangeEvent<any>) => {
    const {name, value} = e.target;

    setAuthor({
      ...author,
      [name]: value
    });
  }

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    dispatch(updateAuthor(JSON.stringify(author), props, token, +props.match.params.id));
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
                  <input type="text" name="name" placeholder={name} onChange={handleAuthorChange}/>
                </label><br/>
                <label>
                  Website:
                  <input type="text" name="website" placeholder={website} onChange={handleAuthorChange}/>
                </label><br/>
                <label>
                  Birthday:
                  <input type="text" name="birthday" placeholder={birthday} onChange={handleAuthorChange}/>
                </label><br/>
                <label>
                  Cover:
                  <input type="text" name="cover" placeholder={cover} onChange={handleAuthorChange}/>
                </label><br/>
              </div>
              <button type="submit">SAVE</button>
            </form> 
          )
      }
    </>
  )
};

export default UpdateAuthor;