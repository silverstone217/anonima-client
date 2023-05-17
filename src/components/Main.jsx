import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/main.css";
import { doc, setDoc, collection, query, onSnapshot, where } from "firebase/firestore"; 
import { db } from "../firebase/Firebase";
import {v4 as uuid} from 'uuid'
import { userContext } from "./AppRouter";


function Main() {
    const {userI, setUserI} = useContext(userContext);
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [create, setCreate] = useState(false);
    const [join, setJoin] = useState(false);
    const navigate = useNavigate();
    const [ListRooms, setListRooms] = useState([]);
    const [roomId, setRoomId] = useState({});
    const id = uuid();
    const idr = uuid();

    //prevents navigation to go back!
    /*useEffect(()=>{
        navigate('/', {
            beforeNavigate: (nextLocation) => {
                if (nextLocation.pahthname !== '/' ) {
                    return false;
                }
                return true;
            }
        })
    },[navigate]);*/

    

    //add rooms to firebase
    const newRoom = ()=>{
        setUserI({ "room": idr, "name": id});

        setTimeout(async()=>{
            await setDoc(doc(db, "rooms", idr), {
                name: id,
                room: idr,
                join: null,
                created: new Date(),
              }).then(()=>{
                //console.log({userI})
                navigate("/chats")
              })
        }, 500)
    }

    // join a room
    const JoinRoom = (roomID)=>{
        setUserI({name:id, room: roomID });

        setTimeout(async()=>{
            await setDoc(doc(db, "rooms", roomID), {
                join: id,
              }, {merge: true} )
              .then(()=>{
                navigate("/chats" )
              })

        }, 500)
    }


    useEffect(() =>{
        const getRoom = async ()=>{
            let r;
            if(ListRooms.length > 0){
                r = Math.floor(Math.random()*ListRooms.length)
                setRoomId(ListRooms[r]);
            }
            else{
                setRoomId("pas de room disponible");
            }
        }
        return ()=> getRoom();

    }, [ListRooms, roomId, navigate])

   
    //get all rooms in the database
    useEffect(()=>{
        const q = query(collection(db, "rooms"), where("join", "==", null));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const rooms = [];
        querySnapshot.forEach((doc) => {
            rooms.push({id: doc.id, name: doc.data().name, room: doc.data().room});
        });
        
        setListRooms(rooms);
        });

        return ()=> unsubscribe();
    }, [])

    //console.log("List rooms: ", ListRooms);

  return (
    <div className='main'>
        <h1>Anonima</h1>
        {
            create === false && join === false

            ?
            <div className='center'>
                <div className="title"  onClick={()=>console.log({userI})}>Join</div>
                {/*<div onClick={()=>{
                    //setCreate(true);
                    console.log({userI})
                    setJoin(false);
                }} className="btn-create">Create</div>*/}
                {
                    roomId === "pas de room disponible"
                    ?
                   
                <div className="btn-create"  onClick={()=>{
                    newRoom();
                    setCreate(false);
                   // console.log(roomId)
                    //console.log(ListRooms)
                    
                    //setJoin(true);
                }}  >Go chat!</div>

                :
                
                <div className="btn-create"  onClick={()=>{
                    JoinRoom(roomId.id)
                    setCreate(false);
                    /*console.log(roomId)
                    console.log(ListRooms)*/
                    //setJoin(true);
                }}  >Go chat!</div> 

                }
            </div>
            :
            create === true && join === false

            ?
            <div className='center'>
            <h3>Create</h3>
            <form>
                <input type='text' 
                className='username' 
                placeholder='Username'
                name='name'
                autoComplete="off"
                autoCapitalize="off"
                required
                onChange={(e)=>setName(e.target.value)}
                />

                <input type='text' 
                className='username' 
                placeholder='Room'
                name='room'
                autoComplete="off"
                autoCapitalize="off"
                required
                onChange={(e)=>setRoom(e.target.value)}
                />
                {
                    name !== "" && room !== ""
                     ? <Link className="btn-link" to={`/chats?name=${name}&room=${room}`}
                    /* onClick={newRoom}*/
                 >
                     <input className="btn" type='submit' 
                     value="Sign in"
                    /> 
                    </Link>

                     : <button disabled>Sign in</button>
                }
                <button className="back" onClick={()=>setCreate(false)} >Go Back</button>
            </form>
        </div>
        :
        <div className="center1">
            <div className="title">List of Rooms</div>
            <div className="divlink">
                {
                    ListRooms.length > 0
                    ?
                    ListRooms.map((r, i)=>{
                        return (
                            <Link className="link" key={i} to={`/chats?name=${id}&room=${r.room}`}>
                            <div className="divdiv" onClick={()=>{
                                JoinRoom(r.id, id)
                            }}>
                               <div style={{marginRight:"5px", opacity:0.7, width:"40px", overflow:"hidden"}}>{i+1}.</div>
                               <div className="rtext">{r.room}</div>
                            </div>
                            </Link>
                        )
                        
                    })
                    :
                    <div style={{alignSelf:"center", fontSize:"18px", justifySelf:"center", marginTop:"45%"}} >No rooms avaible, create new one...</div>
                }
            </div>
            <button className="back" onClick={()=>setJoin(false)} >Go Back</button>
        </div>

        }
    </div>
  )
}

export default Main