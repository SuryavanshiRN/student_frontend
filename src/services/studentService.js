// src/services/studentService.js
import axios from '../utils/axiosInstance';

// 🔐 All calls are protected by token in axiosInstance

export const getAllStudents = async () => {
  const res = await axios.get('/students');
  return res.data;
};

export const getStudentById = async (id) => {
  const res = await axios.get(`/students/${id}`);
  return res.data;
};

export const addStudent = async (student) => {
  const res = await axios.post('/students', student);
  return res.data;
};

export const updateStudent = async (id, updatedData) => {
  const res = await axios.put(`/students/${id}`, updatedData);
  return res.data;
};

export const deleteStudent = async (id) => {
  const res = await axios.delete(`/students/${id}`);
  return res.data;
};
