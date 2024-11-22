import { useState } from 'react'
import './App.css'
import Header from './components/common/header'
import LeftBar from './components/common/leftbar';

function App() {
  const [cost, setCost] = useState(Number(35.75));
  return (
    <>
      <Header COST={cost}/>
      <div className='flex'>
        <LeftBar />
      </div>
    </>
  )
}

export default App
