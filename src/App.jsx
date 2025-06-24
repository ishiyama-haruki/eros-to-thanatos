import { useState, useRef } from 'react'
import './App.css'
import Upload from "./Upload.jsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Upload />
    </>
  )
}

export default App
