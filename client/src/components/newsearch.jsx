import React, { createContext,useContext, useEffect, useState } from "react";
import {context} from "./homepage";
import {Cardmodel} from "./cardmodel";
import { secondcontext } from "./desktopview";
import { isMobile } from "react-device-detect";
const secondc=createContext()
const Searchnew=()=>{
    const [name,findname]=useState('')
    const arraylist =useContext(context)
const second=useContext(secondcontext)
    const [flex,flexarray]=useState([])
    const[boolen,setboolen]=useState(false)
    var array=[]
 
    const creatcard =(friends,i)=>{ 
     return( 
      
         <Cardmodel key={i}
        name={friends.Name}
        rid={friends._id}
      sender_name={arraylist.self.Name}
        //username={friends.username}
        message={''}
        dp={friends.profile_picture}
        s_dp={arraylist.self.profile_picture}
        ></Cardmodel>
    
        ) }
useEffect(
  ()=>{
    array=[]
        arraylist.data.forEach(element => {
            const lowername=element.Name.toLowerCase()
            if(lowername.includes(name.toLowerCase())){
              
           flexarray([...array,element])
           array.push(element)
            }
        });
        if(name.length==0){
            flexarray([])
        }
        setboolen(!(!flex.length))
        // flexarray(array)
        // console.log(array)
    },[name]
)
const clicked=()=>{
    if(!isMobile){
 second.setshow(true)}
}
//console.log(flex)
return(
    <div id="search-section">
    <input type="search" placeholder="search" onChange={(e)=>findname(e.target.value)} ></input>
  {boolen?<div onClick={()=>{clicked()}} >{flex.map(creatcard)}</div>:<p>no result</p>}
    </div>
)

}
export { Searchnew,secondc}