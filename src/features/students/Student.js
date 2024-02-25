import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { FaEdit, FaToggleOn, FaToggleOff } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { Multiselect } from "multiselect-react-dropdown";
import { Link } from "react-router-dom";

export function Student() {
  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 16px",
    marginLeft: "8px",
    cursor: "pointer",
  };
  const initialData = localStorage.getItem("studentData");
  console.log("initialData****", JSON.parse(initialData));

  // initialData ? JSON.parse(initialData) : { classes: [] }
  const [studentList, setStudentList] = useState(
    initialData ? JSON.parse(initialData) : { studentList: [] }
  );
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [email, setEmail] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [activeStudents, setActiveStudents] = useState([]); //array to store the active student IDs.
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5); // Number of students to show per page
  const handleAddStudent = () => {
    const isNumeric = (value) => {
      return /^\d+$/.test(value);
    };

    const isValidEmail = (value) => {
      // Basic email format validation
      return /\S+@\S+\.\S+/.test(value);
    };

    if (
      selectedClass &&
      selectedSubjects.length > 0 &&
      name.trim() !== "" &&
      rollNo.trim() !== "" &&
      isNumeric(rollNo) &&
      email.trim() !== "" &&
      isValidEmail(email)
    ) {
      const studentInfo = {
        name,
        rollNo,
        email,
        subjects: selectedSubjects,
        class: selectedClass,
        isActive: true, // added isActive field.
      };

      setStudentData([...studentData, studentInfo]);

      setActiveStudents([...activeStudents, studentData.length]); // Initially, all students are active.

      // Clear form fields
      setName("");
      setRollNo("");
      setEmail("");
      setSelectedSubjects([]);
      setSelectedClass("");
    } else {
      alert(
        "Please fill in all fields, select a class and subjects, and enter a valid email address."
      );
    }
  };
  const handleEditName = (value, index) => {
    const updatedStudentData = [...studentData];
    updatedStudentData[index].name = value;
    setStudentData(updatedStudentData);
  };
  const handleEditRollNo = (value, index) => {
    const updatedStudentData = [...studentData];
    updatedStudentData[index].rollNo = value;
    setStudentData(updatedStudentData);
  };
  const handleEditEmail = (value, index) => {
    const updatedStudentData = [...studentData];
    updatedStudentData[index].email = value;
    setStudentData(updatedStudentData);
  };
  const handleToggleEdit = (index) => {
    setIsEditing(!isEditing);
  };
  const toggleActivation = (index) => {
    const updatedActiveStudents = [...activeStudents];
    updatedActiveStudents[index] = !updatedActiveStudents[index];
    setActiveStudents(updatedActiveStudents);
  };
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = studentList.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  const data = [
    { id: 1, value: "eng", label: "Eng" },
    { id: 2, value: "maths", label: "Maths" },
    { id: 3, value: "sci", label: "Science" },
    { id: 4, value: "hindi", label: "Hindi" },
    { id: 4, value: "social ", label: "Social " },
    { id: 4, value: "physical education", label: "Physical Education" },
    { id: 4, value: "arts ", label: "Arts " },
    { id: 4, value: "computer ", label: "Computer " },
    { id: 4, value: "foreign lan ", label: "Foreign Lan" },
  ];

  const [option] = useState(data);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const paginationStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    backgroundColor:"grey",
  };
console.log(studentList)
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Student Information</h2>
      <div className="row">
       


        <Link to="/students/addstudents">
          <button style={buttonStyle}>Add Students</button>
        </Link>
      </div>
      <div className="row">
        <div class="col-md-9"></div>
        <div class="col-md-3">
          <div className="input-group mb-3">
            <input
              className="form-control"
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="input-group-text">
              <BiSearch />
            </span>
          </div>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Roll No</th>
            <th>Email</th>
            <th>Class</th>
            <th style={{ width: "200px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((student, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {isEditing ? (
                  <input
                    type="text"
                    value={student.name}
                    onChange={(e) => handleEditName(e.target.value, index)}
                  />
                ) : (
                  student.name
                )}
              </td>
              <td>
                {isEditing ? (
                  <input
                    type="text"
                    value={student.rollNo}
                    onChange={(e) => handleEditRollNo(e.target.value, index)}
                  />
                ) : (
                  student.rollNo
                )}
              </td>
              <td>
                {isEditing ? (
                  <input
                    type="text"
                    value={student.email}
                    onChange={(e) => handleEditEmail(e.target.value, index)}
                  />
                ) : (
                  student.email
                )}
              </td>
              <td>{student.class}</td>
              <td>
                <button onClick={() => handleToggleEdit(index)}>
                  <FaEdit />
                </button>
                <button onClick={() => toggleActivation(index)}>
                  {activeStudents[index] ? <FaToggleOn /> : <FaToggleOff />}
                </button>
              </td>
              {/* <td>EDIT/DELETE</td> */}
            </tr>
          ))}
          <div className="pagination" style={paginationStyles}>
            {Array.from({
              length: Math.ceil(studentList.length / studentsPerPage),
            }).map((_, index) => (
              <button key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </tbody>
      </Table>
      {currentStudents.length === 0 && <p>No record found</p>}
    </div>
  );
}
