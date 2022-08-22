import React from 'react'
import {BrowserRouter,Routes,Route,} from "react-router-dom";
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
function Routing() {
  return (
      <BrowserRouter>
    <div> 
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path='*' element={<ErrorPage/>} />
    </Routes>
  </div>
  </BrowserRouter>
    
  )
}

export default Routing