import React from 'react'
import axios from 'axios'
import {Link, useParams , useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineRead } from "react-icons/ai";




export default function ViewBookDetail() {

let [showBookDetail , setBookDetail] =useState({})
let [tokenStatus , setTokenStatus] = useState();
let Navigate = useNavigate();
axios.defaults.withCredentials = true;

let {id}=useParams();

useEffect(()=>{
    axios.get(`http://localhost:4000/books/bookfind/${id}`)
.then((res)=>{console.log(res);
 setBookDetail(res.data)})
.catch((err)=>{console.log(err);
        Navigate('/')})

},[0])






    return (
        <div id="detail_main_div">

        <ul id="detail_ul">
            <div id="book_detail_image_div">
                
                
                <li><img id="book_detail_image" src={showBookDetail.image} alt="" /></li>
            </div>

           <div id="book_detail_desc_div">
                <li className='book_detail_title_author'>{showBookDetail.title}</li><br/>
                <li className='book_detail_title_author'>By : {showBookDetail.author}</li>
                <p id="book_detail_des">About this book : {showBookDetail.desc}</p>
           </div>
            
            
        </ul>
            
        </div>
    )
}
