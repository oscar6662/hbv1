import { Routes, Route, Outlet, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.scss';
import { fetchUser } from './stores/auth.slice';

import Home from './pages/home/Home';
import Auth from './pages/auth/Auth';
import Register from './pages/register/Register';
import Apply from './pages/apply/Apply';
import DayCareWorkerPage from './pages/daycareworkerpage/DayCareWorkerPage';
import { useEffect } from 'react';
import { useAppDispatch } from './stores/mainStore';
import ParentPage from './pages/parentpage/ParentPage';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/daycareworker/:id" element={<DayCareWorkerPage />} />
        <Route path="/parent/:id" element={<ParentPage />} />
      </Routes>
    </div>
  );
}

export default App;
