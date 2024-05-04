import './App.css';
import {BrowserRouter , Route , Routes , Link, NavLink} from 'react-router-dom'
import Home from './Compo/Home'
import About from './Compo/About'
import ViewAllBooks from './Compo/ViewAllBooks'
import ViewBookDetail from './Compo/ViewBookDetail'
import AddBook from './Compo/AddBook'
import EditBook from './Compo/EditBook'
import DeleteBook from './Compo/DeleteBook'
import LogIn from './Compo/LogIn'
import Register from './Compo/Register'
import { BiSolidLogIn } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";
import LogOut from './Compo/LogOut';
import { useState , useEffect } from 'react';








function App() {


  let [logOut , setLogOut] =useState(false);


  return (

    <BrowserRouter id="main_page">
      {logOut &&<LogOut closeModal={setLogOut} />}
      <NavLink id="header-nav-container">
          <ul id='header-ul'>
              <li className='hearder-li'><Link className='header-links' to='/home'>Home</Link></li>
              <li className='hearder-li'><Link className='header-links' to='/books/all-books'>Books</Link></li>
              <li className='hearder-li'><Link className='header-links' to='/books/addbooks'>Donat-Book</Link></li>
              <li className='hearder-li'><Link className='header-links' to='/about'>About</Link></li>
              <li className='hearder-li' ><Link className='header-links' to='/user/login'>LogIn</Link></li>
              <li className='hearder-li'><Link className='header-links' to='/about' onClick={()=>{
                setLogOut(true)
                }}>Logout</Link></li>
          </ul>
      </NavLink>
          <Routes>
            <Route path='/home' element={<Home></Home>}></Route>
            <Route path='/books/all-books' element={<ViewAllBooks></ViewAllBooks>}></Route>
            <Route path='/books/addbooks' element={<AddBook></AddBook>}></Route>
            <Route path='/books/bookfind/:id' element={<ViewBookDetail></ViewBookDetail>}></Route>
            <Route path='/books/editbook/:id' element={<EditBook></EditBook>}></Route>
            <Route path='/books/delete/:id' element={<DeleteBook></DeleteBook>}></Route>
            <Route path='/about' element={<About></About>}></Route>
            <Route path='/user/login' element={<LogIn></LogIn>}></Route>
            <Route path='/user/register' element={<Register></Register>}></Route>
            <Route path='/user/logout' element={<LogOut></LogOut>}></Route>
          </Routes>
          
    </BrowserRouter>
  );
}

export default App;
