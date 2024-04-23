import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { context } from "./homepage";
import { io } from 'socket.io-client';
import { Navbar } from "./header";
import Chat from "./chat";
import { isMobile } from "react-device-detect";
import {Cardmodel,name,covid} from "./cardmodel";
import axios from "axios";
import {Searchnew} from "./newsearch";
import { Settings } from "./settings";
import { socketContext } from "..";
const secondcontext=createContext()     
const updatelist=createContext();        
const socketcontext=createContext();                    
export function Desktop(){
    const skt=useContext(socketContext)
    const a=useContext(context)
     const [show,setshow]=useState(false)
     const [addconversation,add_conversation]=useState(true)
     const[forsearch,for_search]=useState(false)     
     const[recivername,setrecivername]=useState('')    
     const[search_or_chat,set_search_or_chat]=useState(true)       
     const[background_chat,setbackground_chat]=useState('white')
     const[background_search,setbackground_search]=useState('gray')
     const [open_setting,set_open_setting]=useState(false)           
     const [conversation_list,update_conversation_list]=useState([{}])
     const[empty_convo,set_emptyconvo]=useState(false)
   const socket =io('http://192.168.29.37:4000/')
     const callf=async()=>
     { await axios.get(`/getcoversations/${a.self._id}`).then
      (res => {
          update_conversation_list(res.data)
      })}
     useEffect(()=>{
skt.socket.emit('desktop',null)
       callf()
       console.log("self: ",a.self)
     },[])
     useEffect(()=>{
        skt.socket.emit('join-sender-room',a.sid)
        skt.socket.on('on_broadcast',()=>{
            console.log('by socket')
            callf()
        })
        
     },[a.sid,skt.socket])
    
const creatcard =(friends,i)=>{ 
    if(addconversation)
 {   return(
  
 <Cardmodel key={i}
name={friends.reciver_name}
rid={friends.reciver_id}
sender_name={a.self.Name}
conver_id={friends._id}
message={friends.message}
dp={friends.reciver_dp}
></Cardmodel> 
                                       
  )}else{
    return( 
        
     <Cardmodel key={i}
    name={friends.Name}
    rid={friends._id}
    sender_name={a.self.Name}
    conver_id=''
    //username={friends.username}
    message={''}

    ></Cardmodel>
    ) 
  }
  

   }

function showchat(){
    return(
 <updatelist.Provider value={{socket}}>
        <Chat></Chat>
        </updatelist.Provider>
       
    )
}
useEffect(
    ()=>{
        showchat()
    },[a.name]
)

useEffect(()=>{
if(conversation_list.length!=0){
set_emptyconvo(false)
}else{
    set_emptyconvo(true)
}
},[conversation_list])

return( <div>
        {isMobile?<div id="mobile_home"><Navbar open={set_open_setting} src={`http://192.168.29.37:4000/`+a.self.profile_picture}></Navbar>
       {open_setting?<Settings close={set_open_setting} src={a.self.profile_picture}></Settings> 
       :<><div id="moblielist">
       {search_or_chat?
       <div >{conversation_list.map(creatcard)}</div>
        :<Searchnew></Searchnew>}</div>
       <div id="navbutn">
    <div id="navchat" style={{backgroundColor:`${background_chat}`}} onClick={()=>{set_search_or_chat(true); setbackground_chat('white');setbackground_search('gray') }}>Chats</div>
    <div id="navsearch" style={{backgroundColor:`${background_search}`}} onClick={()=>{set_search_or_chat(false);setbackground_search('white');setbackground_chat('gray')}}>search</div>
    </div></>}
       </div>:
       <>
        <Navbar open={set_open_setting} src={`/`+a.self.profile_picture||'https://butwhytho.net/wp-content/uploads/2023/09/Gojo-Jujutsu-Kaisen-But-Why-Tho-2.jpg'}></Navbar>
          <div id="home">
            <div id='pcontainer'>
           {open_setting?<Settings close={set_open_setting} src={`/`+a.self.profile_picture||'https://butwhytho.net/wp-content/uploads/2023/09/Gojo-Jujutsu-Kaisen-But-Why-Tho-2.jpg'}></Settings> :<><div id='profile' onClick={()=>{set_open_setting(true)}}>
                <div>
                   
                <img id="dp" src={`/`+a.self.profile_picture||'https://butwhytho.net/wp-content/uploads/2023/09/Gojo-Jujutsu-Kaisen-But-Why-Tho-2.jpg'}></img>
                <h3>{a.self.Name}</h3>
                </div>
            </div>
            <></>
           <div id="friends" onClick={()=>{setshow(true)}} >
      {conversation_list.map(creatcard)}
       
            </div></>}
            </div>
            <div id="chat"> 
    {show?<>{showchat()}</>:<h1>Start chat</h1>}
                </div>
             <secondcontext.Provider value={{setshow}}>
            <Searchnew></Searchnew>
        </secondcontext.Provider>
        </div>
        
        </>}
        </div>
    )
}
export {secondcontext,updatelist,socketcontext}