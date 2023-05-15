import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom"
import { BiSend } from "react-icons/bi";
import io  from "socket.io-client"
import "../css/chats.css";

const socket = io.connect('https://anonima.onrender.com')

function Chats() {
  const navigate = useNavigate();
  const {search} = useLocation();
  const [params, setParams] = useState({name:"", room:""});
  const [state, setState] = useState([]);
  const [mess, setMess] = useState("");

  useEffect(()=>{
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams)

    //console.log(searchParams)
    socket.emit('join', searchParams)
  }, [search]);

  useEffect(()=>{
    socket.on('message', ({data})=>{
      setState(m=> [...m, data]);
      //console.log(data)
      //
    })
  }, []);

  const sendMessage = ()=>{
    socket.emit('sendMessage', { message: mess, params });
    setMess("");
  }

  const leaveRoom = ()=>{
    socket.emit('leaveRoom',{params});
    navigate("/");
  }

  /*useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
  
    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);*/

 
  window.onload = () => {
    return navigate("/"); 
  }
  
  return (
    <div className='chats'>
      <h1 onClick={()=>{
        setTimeout(()=>navigate('/'), 600)
      }}>Anonima</h1>
      <div className='chat-center'>
        <header className='header'>
          <div className='header-text'>Room: {params.room} </div>
          <div onClick={leaveRoom} className='header-text leave'>Leave the chat</div>
        </header>
        <main>
          {
            state.map((message, idx) => message.user === "admin"? 
            <span className='admin' key={idx}>{message.message}</span> : 
            message.user.name === params.name
            ?
            <span className='me' key={idx}>{message.message} <span style={{marginLeft:"5px", fontSize:"13px", color:"gray", marginTop:"5px"}}> me </span></span>
            :
            <span className='you' key={idx}>{message.message}</span>)
          }
        </main>
        <footer>
          <div className='input'>
            <input type='text' 
            className='chat' 
            placeholder='Write something...'
            value={mess}
            autoComplete='off'
            onChange={(e)=>setMess(e.target.value)}
            />
          </div>
          <BiSend type='submit' className='send' 
          color='lawngreen' size={35}
          onClick={(e)=>{
            e.preventDefault();
            if(mess !== ""){
              sendMessage()
            }
          }}
          />
        </footer>
      </div>
    </div>
  )
}

export default Chats