import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { addStudent } from '../services/studentService'; // 💡 imported service

const AddStudent = () => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    email: '',
    branch: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStudent(form); // 🧠 service usage
      toast.success('🎉 Student added successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error adding student:', err);
      toast.error('❌ Failed to add student');
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h3 className="mb-4">➕ Add Student</h3>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-4"
          type="text"
          name="branch"
          placeholder="Branch"
          value={form.branch}
          onChange={handleChange}
          required
        />
        <button className="btn btn-success w-100" type="submit">
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
