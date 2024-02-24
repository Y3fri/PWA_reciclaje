import React from 'react';
import { About, Producto, Home, Layout } from './components';

import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="productos" element={<Layout><Producto /></Layout>} />
        <Route path="acerca" element={<Layout><About /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
