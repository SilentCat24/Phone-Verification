import React from 'react'
import {BrowserRouter, Routes,Route} from "react-router-dom";
import Register from './components/Register'
import Login from './components/Login';
import DashBoard from './components/DashBoard';
import Protected from './components/Protected';
import './App.css'




const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
    
      <Route path="/" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/dashboard" element={ <Protected><DashBoard/></Protected> } />
      
      </Routes>      
      
      </BrowserRouter>


    </div>
  )
}

export default App