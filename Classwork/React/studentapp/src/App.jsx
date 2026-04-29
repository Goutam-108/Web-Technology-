import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import StudentInfo from "./Studentinfo"
function App() {
  const fname = "John"
  const age = 25

  return (
    <>
      <h1>Hello {fname}</h1>
      <h2>Age: {age}</h2>
      <StudentInfo name={fname} age={age} major="Computer Science" />
    </>
  )
}

export default App
