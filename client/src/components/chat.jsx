import React, { useContext, useEffect, useState } from "react";
import { context } from "./homepage";
import axios from "axios";
import { Sendermssg } from "./sendersmssg";
import { Recivermssg } from "./recivermssg";
import { Cardmodel, recivername } from "./cardmodel";
import { covid } from "./cardmodel";
import { secondcontext } from "./desktopview";
import { Confirm } from "./confirm";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { updatelist } from "./desktopview";
import { socketContext } from "..";
function Chat(props) {
    const skt= useContext(socketContext)
    const room = useContext(context)
    const locationdata = useLocation()
    const [chatflag, setchatflag] = useState(false)
    const [mssg, setmssg] = useState('')
    const [chat, setchat] = useState([{}])
    const [type, settype] = useState('')
    const [load, setload] = useState(false)
    const [src, setsrc] = useState({ link: '', type: '' })
    const [mediaflag, setmflag] = useState(false)
    const [attach, setattach] = useState('visible')
    const [file, setfile] = useState(false)
    const [menu_visibility, set_menu_visibility] = useState('hidden')
    const [show_alert, set_showalert] = useState(false)
    const [block_unblock, set_block_unblock] = useState('')
    const [block_menu_item, set_block_menu_item] = useState('block')
    const [alert_title, set_alert_title] = useState('')

   const navigate =useNavigate()
    const [update, setupdate] = useState(false)
    var name, id, senderid, reciverroomid,senderroomid,Rid,dp
    if (locationdata.state && locationdata.pathname == '/chat') {
        name = locationdata.state.senderroom.reciver_name;
        id = locationdata.state.senderroom._id
        senderid = locationdata.state.senderroom.sender_id
        reciverroomid = locationdata.state.reciverroom._id 
        senderroomid=locationdata.state.senderroom._id
       Rid=locationdata.state.senderroom.reciver_id
       dp=locationdata.state.senderroom.reciver_dp
    }
    else {
        name = recivername
        id = covid
        senderid = room.sid
        reciverroomid = room.convoid.reciverroom._id
        senderroomid=room.convoid.senderroom._id 
        Rid=room.convoid.senderroom.reciver_id
        dp=room.convoid.senderroom.reciver_dp
    }
    


    const fetchdata = async (url) => {
       
        await axios.get(`/getmessages/${id}`).then(response => {
           setchat(response.data.message)                                                                         
            set_block_unblock(response.data.state)
            if (response.data.state === 'block') {
                set_block_menu_item('unblock')
            }
            setload(true)
            setchatflag(false)
         
        })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(
        () => {

            fetchdata()
          
        }
        , [covid, chatflag, update]
    )
    useEffect(
        () => {
            setload(false)
        }, [covid]
    )
    useEffect(()=>{
        const chatdiv=document.getElementById('mssgcontainer')
        chatdiv.scrollTop=chatdiv.scrollHeight
    },[chat])
    //// sockets

   useEffect(()=>{
skt.socket.emit("join room",{sender:senderroomid,reciver:reciverroomid})

    },[senderroomid,reciverroomid])

    useEffect(()=>{
   
    skt.socket.on('joined',message=>{
    console.log(message)
})

        skt.socket.on('on_message',(data)=>{
            console.log('message ', data)
            if(chatflag){
                setchatflag(false)
            }else{
                setchatflag(true)
            }
        })

     },[skt.socket])

 //////
    const creatmssg = (event) => {
        if (mediaflag) {
            setmssg(event.target.value)
        } else {
            setmssg(event.target.value)
            settype('string')
        }
    }

    const arrangemssg = (mssgbody, i) => {
        if (mssgbody.sender_id == senderid) {
            return (
                <Sendermssg key={i}
                 mssg={mssgbody}></Sendermssg>
            )
        } else {
            return (
                <Recivermssg key={i} 
                 mssg={mssgbody}></Recivermssg>
            )
        }

    }
    const goto = () => {
      

        return (
            chat.map(arrangemssg)
        )
    }
  
    const sendmssg=async()=> {
      
        if (mediaflag) {
            await axios.post(`/upload`, file)
                .then(async (res) => {
                    setmflag(false)
                    console.log(res.data)
                    setmssg(res.data)

                    //setmssg(res.data)

                    await axios.post(`/sendmssg/${id}`, { sender: senderid, message: res.data, type: type, reciverroom: reciverroomid, discription: mssg })
                        .then(res => {
                    
                        skt.socket.emit('emit_message',reciverroomid)
                            console.log(res.data)
                            setchatflag(true)
                            setattach('visible')
                            document.getElementById('write').value = ''
                            setmssg('')

                        })

                })

        } else {
            if (mssg != '') {
                await axios.post(`/sendmssg/${id}`, { sender: senderid, message: mssg, type: type, reciverroom: reciverroomid })
                    .then(res => {
                         skt.socket.emit('emit_message',reciverroomid)
                        skt.socket.emit('broadcast',Rid)
                         setchatflag(true)
                        if (update) {
                            setupdate(false)
                        } else {
                            setupdate(true)
                        }
                        document.getElementById('write').value = ''
                        setmssg('')

                    })
            }
        }
        
    }
    const media = async (event) => {
        var filexp = document.getElementById("one")
        var extension = event.target.value.split('.')[1]
        settype(extension)
        var file = event.target.files[0]
        const formdata = new FormData()
        formdata.append('file', file)
        setfile(formdata)
        var rander = new FileReader();
        rander.onload = () => {
            var a = rander.result
            setmflag(true)
            setsrc({ link: a, type: file.type })
        } 
        rander.readAsDataURL(file)

    }
    const setsemple = () => {
        if (src.type.includes("image")) {
            return (

                <img id="mediaload" src={src.link} style={{ height: '100px' }}></img>
            )
        }
        else {
            return (
                <video id="mediaload" src={src.link} style={{ height: '100px' }}></video>
            )
        }
    }
    const open_menu = () => {
        if (menu_visibility === 'hidden') { set_menu_visibility('visible') }
        else { set_menu_visibility('hidden') }
    }
    const clear_chat = () => {
        set_showalert(true)
        set_menu_visibility('hidden')
        set_alert_title('clear chat')
    }
    function hendel_clear() {
        axios.post(`/clearchat`, { senderroom: id, reciverroom: reciverroomid })
            .then(res => { }).catch(err => { console.log(err) })
        if (!chatflag) {
            setchatflag(true)
        } else {
            setchatflag(false)
        }

    }
    const hendel_block = async () => {
        var state;
        if (block_unblock === 'block') {
            state = 'unblock'
        } else {
            state = 'block'
        }
        let status = await axios.post('http://192.168.29.37:4000/block', { sid: id, status: state, rid: reciverroomid })
        console.log("status update" + status.data)
        if (status.data === 'block') {
            set_block_menu_item('unblock')
        } else {
            set_block_menu_item('block')
        }

        if (update) {
            setupdate(false)
        } else {
            setupdate(true)
        }
    }
    const block = async () => {
        set_showalert(true)
        set_menu_visibility('hidden')
        set_alert_title('block')
    }
    const creatalert = () => {
        if (alert_title === 'clear chat') {
            return (
                <Confirm discription='Clear chat?'
                    onconfirm={() => { hendel_clear(); set_showalert(false) }}
                    confim_title='clear'
                    oncancel={() => set_showalert(false)}
                ></Confirm>
            )
        }
        if (alert_title === 'block') {
            return (
                <Confirm discription='Block ?'
                    onconfirm={() => { hendel_block(); set_showalert(false) }}
                    confim_title={block_menu_item}
                    oncancel={() => set_showalert(false)}
                ></Confirm>
            )
        }
    }
    const videocall=()=>{
        navigate('/video_call')
    }
   // socket.on('message', (mssg) => {

    //     if (chatflag) {
    //         setchatflag(false)
    //     } else {
    //         setchatflag(true)
    //     }
    // })
    // https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH
    return (
        <div id="chatbody">
            <div id="heading">
                <img id="dp" src={'/'+dp}></img>
                <h3>{name}</h3>
                <div style={{ marginLeft: 'auto' }} onClick={() => open_menu()}>
                    <div style={{ height: '5px', backgroundColor: 'black', width: '5px', borderRadius: '5px', margin: '5px' }}></div>
                    <div style={{ height: '5px', backgroundColor: 'black', width: '5px', borderRadius: '5px', margin: '5px' }}></div>
                    <div style={{ height: '5px', backgroundColor: 'black', width: '5px', borderRadius: '5px', margin: '5px' }}></div>
                </div>

            </div>


            <div id='mssgcontainer'>

                {load ? <div id="inside">{goto()}</div> : <div id="loader" ></div>}
                {show_alert ? creatalert() : <></>}
            </div>

            <div id="exp" style={{ height: "100px", width: "100px", position: 'absolute', alignSelf: 'flex-end' }}>
                {mediaflag ? setsemple() : <></>}</div>
            <div id='footing'>
                <input id="write" onChange={creatmssg} placeholder="write a mssage..."></input>
                <input id="one" type="file" accept="video/*,image/*" onChange={media}></input>
                <label htmlFor="one" className="claa">
                    <i className="bi bi-paperclip" style={{ fontSize: "30px" }}></i>
                </label>
            
                <button id='send' onClick={()=>{sendmssg()}}>send</button>
            </div>
            <div id="option-menu" style={{ visibility: `${menu_visibility}`}}>
            <div onClick={() => { clear_chat() }}>clear chat</div>
            <div onClick={() => { block() }}>{block_menu_item}</div>
            </div>
        </div>

    )
}
export default Chat