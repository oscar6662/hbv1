import { Routes, Route, Outlet, Link } from 'react-router-dom';
import './App.css';

import Home from './pages/home/Home';
import Auth from './pages/auth/Auth';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
