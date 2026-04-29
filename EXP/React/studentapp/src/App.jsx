import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import Navbar from "./Navbar"
import Home from "./Home"
import AddStudent from "./AddStudent"
import StudentsList from "./studentslist"

import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/students" element={<StudentsList />} />
      </Routes>
    </>
  )
}

export default App
