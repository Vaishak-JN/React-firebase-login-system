import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import RequireAuth from './components/RequireAuth';
import Form from './components/Form';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
      <Route path="register" element={<Form title="Register" type="register" />} />
      <Route path="login" element={<Form title="Login" type="login" />} />
    </Routes>
  );
}

export default App;
