import React, { lazy, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/home';
import FlagBuy from './pages/buy';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<FlagBuy />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
