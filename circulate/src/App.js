import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import AboutUs from './pages/AboutUs.tsx';
import Products from './pages/Products.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
