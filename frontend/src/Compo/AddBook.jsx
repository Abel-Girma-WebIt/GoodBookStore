import React from 'react'
import axios from 'axios'
import {Link ,useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineRead } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";





export default function AddBook() {

let [newBook , setNewBook] =useState({title:"",author :"",year:"",image:"",desc:""});
let [postStatus , setPostStatus]=useState(false);
let Navigate = useNavigate();
axios.defaults.withCredentials = true;


function collectNewBookData(e){

setNewBook((preData)=>({...preData , [e.target.name] : e.target.value})

)


}


function postBookButton(e){

    e.preventDefault();

    axios.post('http://localhost:4000/books/addbooks' , newBook)
    .then((res)=>{
               if(res.data.valid){
                setNewBook({title:"",author :"",year:"",image:"",desc:""});
                console.log('Book suceesfully posted');
                 setPostStatus(true)}
                 else{
                  Navigate('/user/login')
                 }
               })
    .catch((err)=>{console.log("We could not post this book");
                  Navigate('/user/login')});
}








console.log(newBook)











    return (
  postStatus ? (
    <form id='form-main-container'>
      <div className='form-container'>
        <h1 id="succes_message">Book has been added. Go back to home screen . . . <Link to="/books/all-books"><AiOutlineHome id="home_icon"></AiOutlineHome></Link></h1>
      </div>
    </form>
  ) : (
    <form id='form-main-container'>
      <div className='form-container'><h1>Add your books here</h1></div>
      <div className='form-container'>
        <label className="addbook_input_label" htmlFor=".add_book_input"> Title :</label>
        <input onChange={collectNewBookData} className='add_book_input' value={newBook.title} name="title" type="text" />
      </div>
      <div className='form-container'>
        <label className="addbook_input_label" htmlFor=".add_book_input">Author :</label>
        <input onChange={collectNewBookData} className='add_book_input' value={newBook.author} name="author" type="text" />
      </div>
      <div className='form-container'>
        <label className="addbook_input_label" htmlFor=".add_book_input">Published Year :</label>
        <input onChange={collectNewBookData} className='add_book_input' value={newBook.year} name="year" type="date" />
      </div>
      <div className='form-container'>
        <label className="addbook_input_label" htmlFor=".add_book_input">Image Url</label>
        <input onChange={collectNewBookData} className='add_book_input' value={newBook.image} name="image" type="url" />
      </div>
      <div className='form-container'>
        <label className="addbook_input_label" htmlFor=".add_book_input">About this book : </label>
        <textarea id="book_desc_textarea" onChange={collectNewBookData} className='add_book_textarea' value={newBook.desc} name="desc" type="text" />
      </div>
      <div className='form-container'>
        <button onClick={postBookButton}>Submit</button>
      </div>
    </form>
  )
);
  }