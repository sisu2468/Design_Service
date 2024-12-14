import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home';
import FlagDeliver from './pages/deliver';
import OrderForm from './pages/order';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deliver" element={<FlagDeliver />} />
          <Route path="/order" element={<OrderForm />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
