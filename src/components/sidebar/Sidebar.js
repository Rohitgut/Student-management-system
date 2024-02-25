// import React from 'react';
// import './sidebar.css';
// import { Link,useLocation } from "react-router-dom";
// import "../header/header.css"
// const Sidebar = () => {
//   return (
  
//     <div class="sidenav">

//           <Link to="/" className="nav-link">
//             Classes
//           </Link>
       
//           <Link to="/subjects" className="nav-link">
//             Subjects
//           </Link>
        
//           <Link to="/students" className="nav-link">
//             Students
//           </Link>
        
// </div>

//   );
// };

// export default Sidebar;




import React from 'react';
import './sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import '../header/header.css';

const Sidebar = () => {
  const location = useLocation(); // Get the current location

  return (
    <div className="sidenav">
      <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
        Classes
      </Link>
      <Link to="/subjects" className={`nav-link ${location.pathname === '/subjects' ? 'active' : ''}`}>
        Subjects
      </Link>
      <Link to="/students" className={`nav-link ${location.pathname === '/students' ? 'active' : ''}`}>
        Students
      </Link>
    </div>
  );
};

export default Sidebar;
