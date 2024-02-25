import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AddClass from "../features/classes/AddClass"; // Import AddClass as the default export
import {Class }from "../features/classes/Class"; // Import the Class component

const ClassesRoutes = () => (
  
  <Routes>
    <Route path="/" element={<Class />} />
    <Route path="/classes" element={<Navigate to="/" />} />
    {/* students/addstudents/:id in this routes id is optional  */}
    <Route path="/classes/addclass/:id?" element={<AddClass />} />
    {/* <Route path="/classes/addclass" element={<Class />} />  */}

  </Routes>
);

export default ClassesRoutes;
