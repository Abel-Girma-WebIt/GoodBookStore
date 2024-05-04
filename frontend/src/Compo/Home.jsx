import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Home() {

let [bookData , setBookData] = useState([]);


useEffect(()=>{

axios.get('http://localhost:4000/books/all-books')
.then((res)=>{console.log(res.data.data);
                setBookData(res.data.data)})

.catch((err)=>{
    console.log(err)
})

},[1])

let latestBooks = bookData.filter((eachBook,index)=>index>bookData.length-5);
console.log(latestBooks);



    return (
        <div id="hm_div">
            <div id="hm-intro-div">
                <h1 id="hm-H-one">Welcome to Bella-Books.com <br></br><br></br>Over {bookData.length}+ books</h1>
                <p id="hm-intro-p-tag">Welcome to our public book store app, where literature comes alive! With over {bookData.length}+ carefully curated book collections, we offer a treasure trove of reading experiences for every taste and interest. Whether you're a romance enthusiast, mystery aficionado, or sci-fi buff, our expansive library has something special waiting just for you. Dive into captivating stories penned by talented authors from around the world, explore diverse themes, and embark on unforgettable literary journeys. From timeless classics to contemporary gems, our collection is a haven for book lovers of all ages. Start your adventure today and discover the magic of reading with our vast selection of 3000+ book collections!</p>
            </div>
            <div id="hm_latest_card">
            {latestBooks.map((eachItem)=>{

                return(
                    <div key={eachItem._id} id='futured-books-each-div'>
                        <h1>{eachItem.title}</h1>
                        <img className="hm-book-images" src={eachItem.image} alt="" />
                        <p className='hm-books-desc'>
                        <button className='featured-button'>View more</button>
                        </p>
                    </div>
                )
            })}
            </div>
            <div id='footer_div'>
    <       footer>
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
   
                <div>

    </div>


        </div>
    )
}
