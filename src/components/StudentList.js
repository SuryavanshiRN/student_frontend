import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  getAllStudents,
  deleteStudent as deleteStudentService
} from '../services/studentService'; // 🧠 using service

const StudentList = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (err) {
      console.error('Error fetching students', err);
      toast.error('❌ Failed to load students');
    }
  };

  const deleteStudent = async (id) => {
    try {
      await deleteStudentService(id);
      toast.success('🗑️ Student deleted successfully');
      fetchStudents(); // refresh list
    } catch (err) {
      console.error('Delete failed', err);
      toast.error('❌ Could not delete student');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="card p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>📋 Student List</h3>
        <Link to="/add" className="btn btn-success">
          ➕ Add Student
        </Link>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Branch</th>
            <th style={{ width: '150px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-muted">No students found</td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.email}</td>
                <td>{student.branch}</td>
                <td>
                  <Link to={`/edit/${student._id}`} className="btn btn-sm btn-primary me-2">
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteStudent(student._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
