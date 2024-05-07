import React from 'react'
import axios from 'axios'
import {useState} from  'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';




export default function Login() {


let [userData ,setUSerData] = useState({username:"", password:""})
// let [logStatus , setLogStatus] = useState(false);

let navigate = useNavigate();





function getLogInData (e){

    setUSerData((preData)=>(

        {...preData, [e.target.name]:e.target.value})
    )
}


function onLogInClick(e){
    e.preventDefault();

axios.defaults.withCredentials=true;

axios.post('https://bookstorebackend-jzt9hayz9-abel-girma-webits-projects.vercel.app/user/login' , userData)
.then(()=>{console.log("succesfully logged In!");
navigate('/books/all-books');
 setUSerData({username:"", password:""})})
 .catch((err)=>{console.error(err)})
}

console.log(userData)

    return (
        <div id="login_div">
            <div className="login_items_div"><h1>Bella.Come New User</h1></div>
            <div className="login_items_div"><label className='login_labels' htmlFor="">Username :</label><input    onChange={getLogInData} name="username" value={userData.username} className="log_in_input_areas" type="text" /></div>
            <div className="login_items_div"><label className='login_labels' htmlFor="">password :</label><input    onChange={getLogInData} name="password" value={userData.password} className="log_in_input_areas" type="text" /></div>
            <div className="login_items_div"><button onClick={onLogInClick} className='log_in-register_btn'>LogIn</button></div>
            <div className="login_items_div"><p>New to Bella? </p><button className='log_in-register_btn'><Link to='/user/register'>Register</Link></button></div>
        </div>
    )
}
