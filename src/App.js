import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
