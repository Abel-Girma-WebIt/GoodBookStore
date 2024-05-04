import React from 'react'
import axios from 'axios'
import {Link, useNavigate , useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineRead } from "react-icons/ai";
import { RiArrowGoBackFill } from "react-icons/ri";

export default function DeleteBook() {

    let {id}=useParams();

let [bookForDeltion , setBookForDeltetion] =useState({});
let [deleteStatu , setStatus] = useState(false);
let Navigate = useNavigate();
axios.defaults.withCredentials = true;

useEffect(()=>{

    axios.get(`http://localhost:4000/books/bookfind/${id}`)
    .then((res)=>{console.log(res);
        setBookForDeltetion(res.data)})
    .catch((err)=>{console.log(err)
            Navigate('/')});



}, [])



 
function deleteBook() {
    axios.delete(`http://localhost:4000/books/delete/${id}`)
    .then(()=>{console.log("Book has been deleted");
        setStatus(true)})
    .catch((err)=>{console.log(`Error deleteing the book. Err desc : ${err}`);
    setStatus(false)})
}




    return (
        <div id="delete_main_div">
        {!deleteStatu? ( <ul id="delete_ul"> 
                 <h1>Are you sure you want to delte this book?</h1>
                <li className='book_detail_title_author'>{bookForDeltion.title}</li><br/>
                <li className='book_detail_title_author'>By : {bookForDeltion.author}</li> 
                <div><Link to="/books/all-books"><button className='cancel-button'>Cancel</button></Link><button onClick={deleteBook} className='delete-button'>Yes , delete this book.</button></div>
        </ul>):(<div id="delete_ul">   
                        <h1>Book has been deleted successfully!</h1>
                        <Link to="/books/all-books" ><button className="go_back_after_delete_btn"><RiArrowGoBackFill className="go_back_after_delete_btn"/></button></Link>
                </div>)}
       
            
        </div>
    )
}
