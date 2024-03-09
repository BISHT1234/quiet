import React, { useContext, useEffect, useState } from "react";
import Chat from "./chat";
import axios from "axios";
import { context } from "./homepage";
import { secondcontext, socketcontext, updatelist } from "./desktopview";
import { secondc } from "./newsearch";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
var recivername=''
 var covid='';
 var message='';
 
  function Cardmodel(prop){

    const s2=useContext(socketcontext)
   const a=useContext(context)
   const [resdata,setresdata]=useState({}) 
   const navigate=useNavigate()
   const [unreadedmssgs,setunreadedmssgs]=useState('')
   var cid;
   const creatconversation= async()=>{
    
  await axios.post('/creatrooms',{s_id:a.sid,r_id:prop.rid,reciver_name:prop.name,sender_name:prop.sender_name,reciver_dp:prop.dp,sender_dp:prop.s_dp})
  .then(res=>{
cid=res.data.senderroom._id
covid=res.data.senderroom._id
setresdata({sender:res.data.senderroom._id,reciver:res.data.reciverroom})
message=res.data.reciverroom.message
recivername=res.data.senderroom.reciver_name
      a.setconvoid({senderroom:res.data.senderroom,reciverroom:res.data.reciverroom})
      if(isMobile)
    {
        navigate('/chat',{state:{senderroom:res.data.senderroom,reciverroom:res.data.reciverroom}})
    }
  })
  .catch(err=>{
      console.log(err)
  })
}

  async function clicked(){
    a.setname(prop.name)
  await  a.setrid(prop.rid)
 
creatconversation() 
   }
  const unreaded= async ()=>{
    await axios.get(`/unreaded/${prop.conver_id}`).then(response=>{
    
       setunreadedmssgs(response.data)
        // room.setchat(response.data)
        //    setload(true)
        //    setchatflag(false)
        })
     .catch(err=>{
         console.log(err)
    })
    
    }
    useEffect(()=>{
      unreaded()
     },[[],prop.name])
const mssge=prop.message
var mssg
if(mssge){if(mssge.length<40)
{ mssg=mssge}else{
   mssg=mssge.slice(0,40)+'...'
}}
    return(
        
        <div id="cardbody" onClick={clicked} >
           <img id="carddp" src={`/`+prop.dp}></img>
          <div> <h1 id="cardname">{prop.name}</h1>
        <p style={{width:'max-content'}} >{mssg}</p></div> 
       { unreadedmssgs!="0"?<div id="num">{unreadedmssgs}</div>:<></>}
        </div>
    )
}

export {Cardmodel,covid,recivername}
