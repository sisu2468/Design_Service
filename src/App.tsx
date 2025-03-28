import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import FlagDeliver from './pages/deliver';
import Home from './pages/home';
import OrderForm from './pages/order';
import Preview_Images from './pages/images';
import OrderConfirmation from './pages/orderconfimation';

import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<FlagDeliver />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/images" element={<Preview_Images />} />
          <Route path="/orderconfirm" element={<OrderConfirmation />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
