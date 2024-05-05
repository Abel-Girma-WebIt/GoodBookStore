import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const Navigate = useNavigate();
    const [newUserData, setNewUserData] = useState({
        firstname: "",
        lastname: "",
        email:"",
        username: "",
        password: ""
    });

    const [regiSucess ,setRegiSucc] = useState();

    function getLogInData(e) {
        setNewUserData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    }

    function onRegsiterClick(e) {
            e.preventDefault();
            axios.post('https://good-book-store.vercel.app/user/register', newUserData)
                .then((res) => {
                    console.log("Successfully created an account!");
                    setNewUserData({
                        firstname: "",
                        lastname: "",
                        email:"",
                        username: "",
                        password: ""
                    });
                    setRegiSucc(res.data);
                    Navigate('/user/login');
                })
            .catch((err)=>{

                console.log(err)
            })
 
        }
    
    console.log(newUserData);


    return (
        <div id="login_div">
             {/* <div className="login_items_div"><h1>Congrats! You have succesfully created an account at bella.com! <br/><br/> <button className='log_in-register_btn'><Link to='/user/login'>LogIn</Link></button></h1></div> */}
             <div className="login_items_div"><h1>Welcome to Bella.Come</h1></div>
            <div className="login_items_div"><p>Please create your account here</p></div>
            <div className="login_items_div"><p>{regiSucess}</p></div>
            <div className="login_items_div"><label className='login_labels' htmlFor="">First Name :</label><input onChange={getLogInData} value={newUserData.firstname} className="log_in_input_areas" name="firstname" type="text" /></div>
            <div className="login_items_div"><label className='login_labels' htmlFor="">Last Name :</label><input onChange={getLogInData} value={newUserData.lastname} className="log_in_input_areas" name="lastname" type="text" /></div>
            <div className="login_items_div"><label className='login_labels' htmlFor="">email :</label><input onChange={getLogInData} value={newUserData.email} className="log_in_input_areas" name="email" placeholder="exmple123@gmail.com" type="text" /></div>
            <div className="login_items_div"><label className='login_labels' htmlFor="">Username :</label><input onChange={getLogInData} value={newUserData.username} className="log_in_input_areas" name="username" type="text" /></div>
            <div className="login_items_div"><label className='login_labels' htmlFor="">Password :</label><input onChange={getLogInData} value={newUserData.password} className="log_in_input_areas" name="password" type="password" /></div>
            <div className="login_items_div"><p></p><button onClick={onRegsiterClick} className='log_in-register_btn'>Register</button></div>
            <div className="login_items_div"><p>Already have an account? </p><button className='log_in-register_btn'><Link to='/user/login'>Login</Link></button></div>
            
            
        </div>
    );
}
