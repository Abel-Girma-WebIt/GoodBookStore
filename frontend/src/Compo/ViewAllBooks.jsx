import React from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineRead } from "react-icons/ai";

export default function ViewAllBooks() {

let [allBooks ,setallBooks] = useState([]);
let [inputText, setInputText] =useState('')
let Navigate = useNavigate();

let [tokenStatus , setTokenStatus] = useState();
axios.defaults.withCredentials = true;

useEffect(()=>{

axios.get('http://localhost:4000/books/all-books')
.then((res)=>{
    if(res.data.valid){
    setallBooks(res.data.data);
    setTokenStatus(true);
}})
.catch((err)=>{console.log(err);
        // setTokenStatus(false);
        console.log(`Error fetching user data: ${err}`);
        Navigate('/user/login');})

},[])


function addInputeData(e){
    setInputText(e.target.value)
}


console.log(inputText);


    return (
        <div id="showall_main_div">

            <div id="search_area_div">
                <h1>Search your favorite book here</h1>
                <div id="search_div">
                    <input onChange={addInputeData}id="search_input" placeholder="Search here..." type="text" />
                </div>
            </div>

            <div id="book_Card_container_div">
                {allBooks.filter((item)=> {return (
                    inputText.toLocaleLowerCase()===""? item : item.title.toLocaleLowerCase().includes(inputText))}).map((item)=>{
                return(
                    <ul id="each_card_ul" key={item._id}>  
                      <li className='card_li'>{item.title}</li>
                      <img id="book_image" src={item.image}  alt="" />
                      <li className='card_li'>{item.author}</li>
                      <li className='card_li'>{Date(item.year)}</li>
                      <li className='card_li'><Link to={`/books/bookfind/${item._id}`}><button  className='action_buttons'  ><AiOutlineRead className='React_action_icons'/></button></Link><Link to={`/books/editbook/${item._id}`} ><button className='action_buttons'><AiOutlineEdit className='React_action_icons'/></button></Link><Link to={`/books/delete/${item._id}`}><button className='action_buttons'><AiOutlineDelete className='React_action_icons'/></button></Link></li>
                    </ul>
                )
                })} 
            </div>  
            <div id='footer_div'>
                <footer>
                <h2>About Our Small Bookstore App</h2>
                <p>Welcome to Your Small Bookstore App, where we're passionate about bringing literature into the hands of readers everywhere. Our bookstore is a labor of love, created with the goal of making books accessible to all, regardless of location or financial means.</p>
                <p>At Your Small Bookstore, we offer a diverse collection of books spanning various genres, including fiction, non-fiction, poetry, and more. Whether you're looking for a timeless classic, a thrilling mystery, or a thought-provoking memoir, we have something for every reader.</p>
                <p>But our mission goes beyond simply selling books. We believe in the power of literature to inspire, educate, and unite people from all walks of life. That's why we're committed to fostering a community of readers who share their love of books, engage in meaningful discussions, and support one another in their reading journeys.</p>
                <p>In addition to providing a platform for readers, we also encourage book donations to help expand our collection and ensure that everyone has access to quality reading material. Whether you're donating a beloved book or discovering a new favorite, we're grateful for your support.</p>
                <p>Thank you for choosing Your Small Bookstore App. Together, let's celebrate the joy of reading and build a world where literature thrives.</p>
                <p>&copy; 2024 Your Small Bookstore App. All rights reserved.</p>
                <p>Contact us: info@yourbookstoreapp.com</p>
                </footer> 
    </div>
        </div>
    )
}
