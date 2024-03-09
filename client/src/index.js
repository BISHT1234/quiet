import React from 'react';
import ReactDOM from 'react-dom/client';
import {   BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './css/index.css';
import './css/login.css';
import './css/home.css';
import "./css/chat.css";
import { Mobile } from './components/mobileview.jsx';
import './css/cardmodel.css'
import './css/massage.css'
import App from './App.js';
import { Login } from './components/login.jsx';
import { Mchat } from './components/mobilechat';
import { Signin } from './components/signin.jsx';
import { Home } from './components/homepage.jsx';
import Chat from './components/chat.jsx'
import './css/settings.css'
import { Video_Call } from './components/video_Call.jsx';
import { Socketprovider } from './components/socket.jsx';
import { createContext, useContext, useMemo } from "react"
import { io } from 'socket.io-client';
export const socketContext = createContext(null)
const root = ReactDOM.createRoot(document.getElementById('root'));




const socket =io('http://192.168.29.37:4000/')
  
root.render(

  
<socketContext.Provider value={{socket}}>
  <BrowserRouter>
 
       <Routes>
        <Route exect path='/' element={<App />}> </Route>
        <Route exect path='/login' element={<Login/>}></Route>
        <Route exect path='/signin' element={<Signin/>}></Route>
        <Route exect path='/homepage' element={<Home/>}></Route>
        <Route exect path='/mobilepage' element={<Mobile/>}></Route>
        <Route exect path='/chat' element={<Chat/>}></Route>
        <Route  exect path='/video_call' element={<Video_Call></Video_Call>}></Route>
      </Routes>  
      </BrowserRouter>
      </socketContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

