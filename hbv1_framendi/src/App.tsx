import { Routes, Route, Outlet, Link } from 'react-router-dom';
import './App.css';

import Home from './pages/home/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;