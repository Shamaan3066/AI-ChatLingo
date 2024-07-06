import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './auth/Register';
import Login from './auth/Login';
import Home from './pages/Home';
import ModulesHome from './pages/modules/modules-home';
import ChatHome from './pages/chats/chatInterface';
import ModuleLoader from './pages/modules/ModuleLoader';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/:language-modules' element={<ModulesHome />} />
        <Route path='/login' element={<Login />} />
        <Route path='/chat/:chatlang' element={<ChatHome />} />
        <Route path='/:language/:moduleNumber' element={<ModuleLoader />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
