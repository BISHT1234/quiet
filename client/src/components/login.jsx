import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "./header";
import axios from "axios";
import {isMobile} from 'react-device-detect';
import { useNavigate } from "react-router-dom";
import { socketContext } from "..";
export var  Sender_id
export function Login(){ 
    const [data,setdata] = useState([{email:"",password:""}])
    const [mssg,setmssg] =useState("")
   const navigation=useNavigate()
    function check_user(){
        axios.post('/chekuser',data,)
        .then(res=>{
            if(res.data.exist){
         navigation('/homepage',{state:{mydetails:res.data.User}})
            }
            else{
                setmssg(res.data)
            }  
        }) 
        .catch(err=>{
            console.log(err)
            
        })
        }
const collect=(e)=>{
    setdata({...data,[e.target.name]:e.target.value})
   
}
return(
    <div>
<Navbar></Navbar>
<div id="form">
<h1 id="heading">Login</h1>
<h3 className="entries">UserName</h3>
<input name="email" onChange={collect} type="text" placeholder="Enter your email"></input>
<h3 className="entries">Password</h3>
<input name="password" onChange={collect} type="text" placeholder="Enter your Password"></input>

<button onClick={check_user}>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className ="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>
</button>
<p id="glti" style={{color:"red"}}>{mssg}</p>
<p>don't have account yet? <a href="/signin">click here</a></p>

</div>
    </div>
)
}
