import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🛡️ Protected Routes */}
          <Route path="/" element={<PrivateRoute><StudentList /></PrivateRoute>} />
          <Route path="/add" element={<PrivateRoute><AddStudent /></PrivateRoute>} />
          <Route path="/edit/:id" element={<PrivateRoute><EditStudent /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
