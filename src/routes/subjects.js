import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AddSubjects from "../features/subjects/AddSubjects";
import { Subject } from "../features/subjects/Subject";
const SubjectsRoutes = () => (
  <Routes>
    <Route path="/subjects" element={<Subject />} />
    {/* <Route path="/subjects" element={<Navigate to="/" />} /> */}
    <Route path="/subjects/list" element={<Navigate to="/subjects" />} />
    {/* students/addstudents/:id in this routes id is optional  */}

    <Route path="/students/addsubjects/:id?" element={<AddSubjects />} />
  </Routes>
);
export default SubjectsRoutes;
