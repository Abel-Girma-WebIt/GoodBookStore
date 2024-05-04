import React from 'react'
import axios from 'axios'
import {Link , useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineRead } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { useParams } from 'react-router-dom';





export default function EditBook() {
    let [postStatus , setPostStatus]=useState(false);
    let [EditedBookDetail , setEditedBookDetail] =useState({title:"",author :"",year:"",image:"",desc:""})
    let Navigate = useNavigate();
axios.defaults.withCredentials = true;


    let {id}=useParams();
    
    useEffect(() => {
        axios.get(`http://localhost:4000/books/bookfind/${id}`)
            .then((res) => {
                console.log(res);
                setEditedBookDetail(res.data);
            })
            .catch((err) => {
                console.log(err.message);
                Navigate('/')
            });
    }, []);


console.log(EditedBookDetail);

function collectNewBookData(e){

setEditedBookDetail((preData)=>({...preData , [e.target.name] : e.target.value})

)


}


function postBookButton(e){

    e.preventDefault();

    axios.put(`http://localhost:4000/books/editbook/${id}` , EditedBookDetail)
    .then(()=>{setEditedBookDetail({title:"",author :"",year:"",image:"",desc:""});
                console.log('Book suceesfully edited');
                 setPostStatus(true)})
    .catch((err)=>console.log("We could not post this book"))
}

















    return (


        postStatus ? (
            <form id='form-main-container'>
              <div className='form-container'>
                <h1 id="succes_message">Book has been edited and posted sucessfully. Go back to home screen . . . <Link to="/books/all-books"><AiOutlineHome id="home_icon"></AiOutlineHome></Link></h1>
              </div>
            </form>
          ) : (    <form id='form-main-container'>
    <div className='form-container'><h1>Add your books here</h1></div>
    <div className='form-container'>
      <label className="addbook_input_label" htmlFor=".add_book_input"> Title :</label>
      <input onChange={collectNewBookData} className='add_book_input' value={EditedBookDetail.title} name="title" type="text" />
    </div>
    <div className='form-container'>
      <label className="addbook_input_label" htmlFor=".add_book_input">Author :</label>
      <input onChange={collectNewBookData} className='add_book_input' value={EditedBookDetail.author} name="author" type="text" />
    </div>
    <div className='form-container'>
      <label className="addbook_input_label" htmlFor=".add_book_input">Published Year :</label>
      <input onChange={collectNewBookData} className='add_book_input' value={EditedBookDetail.year} name="year" type="date" />
    </div>
    <div className='form-container'>
      <label className="addbook_input_label" htmlFor=".add_book_input">Image Url</label>
      <input onChange={collectNewBookData} className='add_book_input' value={EditedBookDetail.image} name="image" type="url" />
    </div>
    <div className='form-container'>
      <label className="addbook_input_label" htmlFor=".add_book_input">About this book : </label>
      <textarea id="book_desc_textarea" onChange={collectNewBookData} className='add_book_textarea' value={EditedBookDetail.desc} name="desc" type="text" />
    </div>
    <div className='form-container'>
      <button onClick={postBookButton}>Submit</button>
    </div>
  </form>)


);
  }