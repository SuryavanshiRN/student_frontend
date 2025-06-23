import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  getStudentById,
  updateStudent,
} from '../services/studentService'; // 🎯 Clean API layer

const EditStudent = () => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    email: '',
    branch: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getStudentById(id); // 🧠 Clean service
        setForm(data);
      } catch (err) {
        console.error('Error fetching student:', err);
        toast.error('❌ Could not load student details');
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStudent(id, form); // 🔧 Clean service
      toast.success('✅ Student updated successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error updating student:', err);
      toast.error('❌ Failed to update student');
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h3 className="mb-4">✏️ Edit Student</h3>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-4"
          type="text"
          name="branch"
          value={form.branch}
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary w-100" type="submit">
          Update Student
        </button>
      </form>
    </div>
  );
};

export default EditStudent;
