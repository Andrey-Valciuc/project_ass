import React from 'react';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { CreatePostForm } from './components/CreatePostForm';


const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create-post" element={<CreatePostForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
