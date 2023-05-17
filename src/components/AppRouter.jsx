import React, {createContext, useState, useContext} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from './Main';
import Chats from './Chats';


export const userContext = createContext();

function AppRouter() {
 
  
  const [userI, setUserI]= useState({name:'', room:''})
  return (
    <userContext.Provider value={{userI, setUserI}}>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="chats" element={<NoUser><Chats/></NoUser>}/>
        <Route path="/*" element={<Main/>}/>
      </Routes>
    </userContext.Provider>
  )
}

const NoUser = ({children}) => {
  const navigate = useNavigate();
  const us = useContext(userContext)

  if( us.name !== ''){
    return <>{children}</>
  }
  else{
    return navigate("/")
  }
}

export default AppRouter