import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './home';
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home chain={'main'} />}></Route>
      <Route path="/test/us" element={<Home chain={'test'} />}></Route>
    </Routes>
  </BrowserRouter>
);

export default App;
