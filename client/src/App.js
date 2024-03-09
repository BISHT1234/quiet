import { Navbar } from "./components/header";
import { Login } from "./components/login";
import React from "react";

function App() {
 

function click_login(){
window.open('/login','_self')
}
 function click_signin(){
  window.open('/signin','_self')
 }


  return (
    
    <div className="App">
         <Navbar></Navbar>
   

   
    <div id="body">
   {/* <picture>
<source id="mobileimg" srcSet="https://media.istockphoto.com/id/1262582481/vector/chat-messages-smartphone-sms-on-mobile-phone-screen-man-woman-couple-chatting-messaging.jpg?s=1024x1024&w=is&k=20&c=9ekzDJq4_6FCNDOPF9yo8Y5MlARfFUA9PrPJP25d9Zg=" media="(max-width:600px)" ></source>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9thMwDxzkkjVcaOJlD1bdEzugu1ShCL3gkYlMp8c2paijN5RsiJPLtKO1qIVN89y-a6U&usqp=CAU"></img>
    </picture> */}

    <div>
      <button id="lb" onClick={click_login}>Login </button>
      <button id="sb" onClick={click_signin}> Signin</button>
    </div>
   
        </div>

    </div>
  );
}

export default App;
