
import { useState } from 'react'
import './App.css'
import TruckPage from './TruckPage.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TruckPage />
    </>
  )
}

export default App
