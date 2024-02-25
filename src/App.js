import "./App.css";
import React from "react";
import Header from "./components/header/header.js";
import RoutesConfig from "./routes";
// import NavBar from "./components/navbar/navbar";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <>
      {/* <NavBar /> */}
      <Header/>
      <Sidebar />
      <div className="main-content">
        <RoutesConfig />
        
      </div>
    </>
  );
}

export default App;


// import "./App.css";
// import { Route, Routes, Link } from "react-router-dom";
// import React from "react";
// import { Student } from "./features/students/Student";
// import { Subject } from "./features/subjects/Subject";
// import { Classes } from "./features/classes/Class";
// import { AddClass } from "./features/classes/AddClass";

// function App() {
//   const sidebarStyle = {
//     width: "200px",
//     height: "100%",
//     position: "fixed",
//     backgroundColor: "rgb(17 17 17 / 73%)",
//     padding: "15px",
//     boxSizing: "border-box",
//     right: "0", 
    
//   };

//   const linkStyle = {
//     color: "white",
//     textDecoration: "none",
//     display: "block",
//     margin: "50px 0",
//     fontWeight: "800",
//   };
//   return (
//     <div>
    
//       <header>
       
//         <h2>Student Management System</h2>
//       </header>
//     <nav style={sidebarStyle}>
//       <ul style={{ listStyleType: "none", padding: 0 }}>
//         <li>
//           <Link to="/" style={linkStyle}>Class</Link>
//         </li>
//         <li>
//           <Link to="/subjects" style={linkStyle}>Subjects</Link>
//         </li>
//         <li>
//           <Link to="/students" style={linkStyle}>Students</Link>
//         </li>
//       </ul>
//     </nav>

//       <Routes>
//         <Route path="/" element={<AddClass />} />
//         <Route path="/students" element={<Student />} />
//         <Route path="/subjects" element={<Subject />} />
//         <Route path="/addclass" element={<Classes />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
