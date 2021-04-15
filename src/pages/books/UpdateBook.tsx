import React, { useState, FC, useEffect } from 'react';
import { updateBook } from '../../redux/actions/bookAction';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import store from '../../redux/store';

const UpdateBook: FC<{match: any}> = (props) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: any) => state.authReducer.isLogin)
  const token = useSelector((state: any) => state.authReducer.token);
  const list = useSelector((state: any) => state.bookReducer.list);
  const data = useSelector((state: any) => state.bookReducer.book);
  const [book, setBook] = useState(
    {
      ...data
    }
  );

  const handleBookChange = (e: React.ChangeEvent<any>) => {
    const {name, value} = e.target;
    // let newvalue = (name === "price" || name === "year") ? (value as number) : (value as String);
    let newvalue = (name === "price") 
            ? 10.2
            : ( name === "year" )
              ? 1842
              : value;
    newvalue = ( value === "" ) ? null : value;
    
    setBook({
      ...book,
      [name]: newvalue
    });
  }

  const handleAuthorChange = (e: React.ChangeEvent<any>) => {
    const {name, value} = e.target;
    let newvalue = (name === "id") ? 10 : value;
    setBook({
      ...book,
      author: {
        ...book.author,
        [name]: newvalue
      }
    });
  }

  // console.log("before: ", book);

  const handleCategoryChange = (e: React.ChangeEvent<any>) => {
    const {name, value} = e.target;
    let newvalue = (name === "id") ? 10 : value;

    let newCate: any = book.categories;
    newCate = newCate.length
          ? (
            newCate.map((cate: any) => {
              if (!Object.keys(cate).includes(name)) {
                return {
                  ...cate,
                  [name]: newvalue
                }
              }
              return cate;
            })
          )
          : [
            ...newCate,
            {
              [name]: newvalue
            }
          ]

    setBook({
      ...book,
      categories: newCate
    });
  }

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    dispatch(updateBook(JSON.stringify(book), props, token, +props.match.params.id));
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
                  <input type="text" name="name" value={book.name} onChange={handleBookChange}/>
                </label><br/>
                <label>
                  Description:
                  <input type="text" name="description" value={book.description} onChange={handleBookChange}/>
                </label><br/>
                <label>
                  Price:
                  <input type="number" step="0.01" name="price" value={book.price} onChange={handleBookChange}/>
                </label><br/>
                <label>
                  Year:
                  <input type="number" name="year" value={book.year} onChange={handleBookChange}/>
                </label><br/>
                <h5>Author: </h5>
                <label>
                  Id:
                  <input type="number" name="id" value={book.author.id} onChange={handleAuthorChange}/>
                </label><br/>
                <label>
                  Name:
                  <input type="text" name="name" value={book.author.name} onChange={handleAuthorChange}/>
                </label><br/>
                <label>
                  Website:
                  <input type="text" name="website" value={book.author.website} onChange={handleAuthorChange}/>
                </label><br/>
                <label>
                  Birthday:
                  <input type="text" name="birthday" value={book.author.birthday} onChange={handleAuthorChange}/>
                </label><br/>
                <label>
                  Cover:
                  <input type="text" name="cover" value={book.author.cover} onChange={handleAuthorChange}/>
                </label><br/>
                <label>
                  Publisher:
                  <input type="text" name="publisher" value={book.publisher} onChange={handleBookChange}/>
                </label><br/>
                <label>
                  Cover:
                  <input type="text" name="cover" value={book.cover} onChange={handleBookChange}/>
                </label><br/>
                <h5>Categories:</h5>
                <label>
                  Id
                  <input type="number" name="id" value={book.categories[0].id} onChange={handleCategoryChange}/>
                </label><br/>
                <label>
                  Name:
                  <input type="text" name="name" value={book.categories[0].name} onChange={handleCategoryChange}/>
                </label><br/>
                <label>
                  Description:
                  <input type="text" name="description" value={book.categories[0].description} onChange={handleCategoryChange}/>
                </label><br/>
              </div>
              <button type="submit">SAVE</button>
            </form> 
          )
      }
    </>
  )
};

export default UpdateBook;