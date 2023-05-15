import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './Main';
import Chats from './Chats';

function AppRouter() {
  return (
    <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="chats" element={<Chats/>}/>
    </Routes>
  )
}

export default AppRouter