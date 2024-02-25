// RoutesConfig.js
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AddStudents from "../features/students/AddStudents";
import { Student } from "../features/students/Student";

const StudentsRoutes = () => (
  <Routes>
    <Route path="/students" element={<Student />} />
    <Route path="/students/list" element={<Navigate to="/students" />} />
    {/* students/addstudents/:id in this routes id is optional  */}
    <Route path="/students/addstudents/:id?" element={<AddStudents />} />
  </Routes>
);

export default StudentsRoutes;
