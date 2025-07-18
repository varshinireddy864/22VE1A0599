import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/Home';
import StatsPage from './pages/Stats';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/stats">Stats</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
