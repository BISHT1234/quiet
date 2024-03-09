import React, { createContext, useContext, useEffect, useState } from "react";
import { Navbar } from "./header";

import axios from "axios";
import { Desktop } from "./desktopview";
import { socketContext } from "..";
import { Mobile } from "./mobileview";
import { Login } from "./login";
import { useLocation } from "react-router-dom";
var Sender_id;

const context = createContext()

export function Home() {
    const location = useLocation()
 
    const [update, setupdate] = useState(false)
    const [data, setdata] = useState([{ Name: "", Username: "",profile_picture:"" }])
    const [name, setname] = useState('')
    const [rid, setrid] = useState('')
    const [sid, setsid] = useState('')
    const [convoid, setconvoid] = useState({ senderroom: '', reciverroom: '' })
    const [chat, setchat] = useState([{}])
    const [conversation, setconversation] = useState([{}])
    const [self, setself] = useState(location.state.mydetails)
const socket=useContext(socketContext)
//     useEffect(()=>{ 
//    const fcall = async()=>{
 
//  }
//             fcall();
// },[update])

    async function post() {
      
        await axios.get(`/getcoversations/${location.state.mydetails._id}`).then
        (res => {
            setconversation(res.data)
        })
     
        await axios.post("/getfriends")
            .then(
                res => {
                    
                    setdata(res.data.users)

                    setsid(location.state.mydetails._id)

                }
            ).catch(err => {
                console.log(err)
            })

    }




    useEffect(() => {
        setself(location.state.mydetails)
        console.log(location.state.mydetails)
        post()
    }, [])
    // useEffect(() => {
       
    //     socket.socket.on('changedp',async()=>{
    //         console.log(self._id)
    //         let res = await axios.get('http://192.168.29.37:4000/getmydetails',{id:self._id})
    //         setself(res.data)
    //         console.log(res.data)
    //     })
    // }, [socket.socket])



    return (
        <div>

            <context.Provider value={{ name, setname, data, rid, setrid, sid, setsid, chat, setchat, convoid, setconvoid, self,setself, conversation, setupdate, update,setconversation }}>
                <Desktop></Desktop>
            </context.Provider>
        </div>
    )
}

export { context }
