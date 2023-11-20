
import { useState } from 'react'
import './App.css'
import HomePage from './HomePage.jsx'
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
