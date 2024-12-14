import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import FlagDeliver from './pages/deliver';
import Home from './pages/home';
import OrderForm from './pages/order';

import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<FlagDeliver />} />
          <Route path="/order" element={<OrderForm />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
