import React, { useRef, useState } from "react";
import { Navbar } from "./header";
import axios from 'axios'
export function Signin(){
const [data,setdata] = useState([{Name:"",Email:"",Username:"",Password:""}])
const [warning,setwar] = useState("warning")
const hendelkeydown=(e,index)=>{
    if(e.key==='Enter'){
        e.preventDefault()
        const nextindex=index+1
        if(nextindex<inputref.current.length){
            inputref.current[nextindex].focus();
        }else{
            inputref.current[0].focus();
        }
    }
}
const  required=()=>{
    if(document.getElementById('name').value.length=== 0) {
        console.log( "Name can't be empty")
        return false
       }
       else if(document.getElementById('username').value.length=== 0) {
        console.log( "Username can't be empty")
       return false}
       else if(document.getElementById('password').value.length=== 0) {
        console.log( "Password can't be empty")
    return false   
    }
       else if(document.getElementById('email').value.length===0) {
        console.log( "Email can't be empty")
    return false   
    }
       else
       return true
}
const onchange=(e)=>{
    setdata({...data,[e.target.name]:e.target.value})
}
function creat(){
//    if( if(document.getElementById('name').value.length== 0) {
//     console.log("Name can't be empty")
// }.value.length== 0) {
// //     console.log("Name can't be empty")
// //    }
if(required()){
  console.log(required())
axios.post('/creatuser',data)
.then( 
    
   window.open('/login','_self')
 )
.catch(error=>{
    if (error.response) { 
        // If server responded with a status code for a request 
        console.log("Data ", error.response.data); 
        console.log("Status ", error.response.status); 
        console.log("Headers ", error.response.headers); 
    } else if (error.request) { 
        // Client made a request but response is not received 
        console.log("called", error.request); 
    } else { 
        // Other case 
        console.log("Error", error.message); 
    } 


})}
else{
    setwar("Fill each feild ")
}
}
const inputref=useRef([])
const go_to_next_feild=(ref,index)=>{
   
    if(ref && !inputref.current.includes(ref)){
        inputref.current.push(ref)
        if(index===inputref.current.length-1){
            ref.onkeydown =(e)=>hendelkeydown(e,index)
        }
    }
}

   
    return (
        <div>
            <Navbar></Navbar>
        
        <div id="card">
    <h1>Sign In</h1>
  
<p id="warning" >{warning}</p>

<input onChange={onchange}  className="details"  ref={(ref)=>go_to_next_feild(ref,0)}  id="name" name="Name" placeholder="Name"></input>

<input onChange={onchange} className="details" ref={ref=>go_to_next_feild(ref,1)}  id="email" name="Email" placeholder="Email"></input>

<input onChange={onchange} className="details" ref={ref=>go_to_next_feild(ref,2)} id="username" name="Username" placeholder="username"></input>

<input onChange={onchange} className="details" ref={ref=>go_to_next_feild(ref,3)} id="password" type="password" name="Password" placeholder="password"></input>
<button onClick={creat}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg></button>
<p>Login <a href="/login">click here</a></p>
</div>
        </div>
    )
    
}