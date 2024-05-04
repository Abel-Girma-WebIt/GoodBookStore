import React from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function LogOut({closeModal}) {

    axios.defaults.withCredentials = true;
    const Navigate = useNavigate();
  
    function clearCookieAndLogOUt (){
        axios.post('http://localhost:4000/user/logout')
        .then((res)=>{console.log(res.data.message);
                        Navigate('/user/login');
                         closeModal(false)})
        .catch((err)=>{console.log(err)})
    }


    
    return (
        <div id="logout_pop_div">
            <div id="logout_pop_header"><p id="pop_sure">Are you sure you want to logout?</p><h4 id="pop_sure_X" onClick={()=>closeModal(false)}>X</h4></div>
            <div id="logout_pop_yes_or_cancel"><button id="pop_cancel"><Link className="pop_links" onClick={()=>closeModal(false)}>Cancel</Link></button><button id="pop_continue"><Link className="pop_links" onClick={clearCookieAndLogOUt}>Continue</Link></button></div>
            
        </div>
    )
}
