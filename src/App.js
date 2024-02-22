import React from 'react';
import { Layout, Home, About, Gallery } from "./components";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="galeria" element={<Gallery />} />
      <Route path="acerca" element={<About />} />
    </Routes>
  </Layout>
  </Router>
  );
}

export default App;
