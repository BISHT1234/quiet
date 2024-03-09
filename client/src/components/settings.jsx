import { connections } from "mongoose"
import { useContext, useEffect, useState } from "react"
import { context } from "./homepage"
import axios from "axios"
import { socketContext } from "..";

export const Settings =(props)=>{
const [dp,setdp]=useState(null)
const [src,setsrc]=useState(null)
const [newname,setnewname]=useState(null)
const [imaflag,setimg_flag]=useState(false)
const [img_label,set_img_label]=useState(false)
const socket=useContext(socketContext)
const [upload_button_visibilty,set_upload_button_visibilty] =useState('none')
    const info =useContext(context)

    const media = (event)=>{
const file=event.target.files[0];
const formdata= new FormData();
formdata.append('file',file)
setdp(formdata) 
const filereader=new FileReader()
filereader.onload=()=>{
    var imgurl = filereader.result
    setsrc(imgurl)
    setimg_flag(true)
}
filereader.readAsDataURL(file)
set_upload_button_visibilty('block')
    }
    useEffect(()=>{
        console.log(info.self)
if(info.self.profile_picture!="null"){
set_img_label(true)
}
    },[info])
    const upload=async()=>{
     let response =   await axios.post(`/upload`, dp)
     console.log(response.data)
     let res =await axios.post('/updatepic',{url:response.data,id:info.self._id})
          info.setself(res.data)
          if(res.data){
socket.socket.emit('dpupdate',null)
          }
          set_upload_button_visibilty('none')
    }

return(
    <div id="settings">
        <div onClick={()=>{props.close(false)}}><i style={{fontSize:'x-large'}} class="bi bi-arrow-left"></i></div>
  <div style={{display:'flex',justifyContent:'center'}}>
    <span>{imaflag?<img style={{height:'80px',width:'80px',borderRadius:'20px'}} src={src}></img>:<><input id="profile_pic" type="file" onChange={media} style={{display:'none'}}></input>
      <label htmlFor="profile_pic" className="profile_dp" >
     {img_label?<img src={`/`+info.self.profile_picture} style={{height:'80px',width:'80px',borderRadius:'20px'}}></img> :<i className="bi bi-person-circle" style={{ fontSize: "80px" }}></i>}
      </label></>}
      <button id="uploadbutton" style={{display:upload_button_visibilty}} onClick={upload} >
      <i class="bi bi-upload"> upload</i></button>
      </span> 
      </div> 
       <h5>Name</h5>
        <h3>{info.self.Name}</h3>
       
       <h5>Email</h5>
        <h3>{info.self.Email}</h3>
    </div>
)
}