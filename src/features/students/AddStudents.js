import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { FaEdit, FaToggleOn, FaToggleOff } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { Multiselect } from "multiselect-react-dropdown";
import { useNavigate, useParams } from "react-router-dom";

function AddSubjects() {
  const navigate = useNavigate();
  const { id } = useParams();
  const initialData = localStorage.getItem("students");
  const [students, setStudentJson] = useState(
    initialData ? JSON.parse(initialData) : { students: [] }
  );
  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 16px",
    marginLeft: "8px",
    cursor: "pointer",
  };

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  //   const [name, setName] = useState("");
  //   const [rollNo, setRollNo] = useState("");
  //   const [email, setEmail] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [activeStudents, setActiveStudents] = useState([]); //array to store the active student IDs.
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5); // Number of students to show per page

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [userClass, setUserClass] = useState("");
  const [subjects, setSubjects] = useState([]);

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

      console.log("studentData*********", studentInfo, studentData);
      const storedData = localStorage.getItem("studentData");
      console.log("studentInfo****", storedData);
      if (storedData) {
        const parseData = JSON.parse(storedData);
        console.log("studentData**********", studentData);
        console.log("storedData**********", storedData);
        const newArray = [...parseData, studentInfo];
        localStorage.setItem("studentData", JSON.stringify(newArray));
      } else {
        localStorage.setItem(
          "studentData",
          JSON.stringify([
            {
              name,
              rollNo,
              email,
              subjects: selectedSubjects,
              class: selectedClass,
              isActive: true,
            },
          ])
        );
      }
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
    navigate("/students");

    // const id = initialData ? JSON.parse(initialData).classes.length + 1 : 1;
    // const newClassObj = { id, name: trimmedClassName, status: 1 };

    // const updatedData = {
    //   ...classes,
    //   classes: [...classes.classes, newClassObj],
    // };

    // setStudentJson(studentData);
    // localStorage.setItem("students", JSON.stringify(students));
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
  const currentStudents = studentData.slice(
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
  };

  useEffect(() => {
    const localStorageData = localStorage.getItem("classes");
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      if (parsedData.classes) {
        setClasses(parsedData.classes);
      }
    }
  }, []);

  console.log(selectedClass - 1, classes);
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Student Information</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="classDropdown">Select a class: </label>
            <select
              id="classDropdown"
              className="form-control"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">Select a class</option>
              {classes.map((classItem) => (
                <option key={classItem.id} value={classItem.id}>
                  {classItem.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="MultiselectDropdown">Select a Subject: </label>
            {classes[selectedClass - 1]?.subjects?.length > 0 ? (
              <Multiselect
                options={classes[selectedClass - 1]?.subjects}
                selectedValues={selectedSubjects}
                onSelect={(selectedList) => setSelectedSubjects(selectedList)}
                onRemove={(selectedList) => setSelectedSubjects(selectedList)}
                displayValue="name"
                id="MultiselectDropdown"
              />
            ) : (
              <select
                className="form-select" // Bootstrap class for select input
                id="classDropdown"
              >
                <option value="">Subject Not Found</option>
              </select>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="nameInput">Name: </label>
            <input
              type="text"
              id="nameInput"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="rollNoInput">Roll No: </label>
            <input
              type="text"
              id="rollNoInput"
              className="form-control"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="emailInput">Email: </label>
            <input
              type="text"
              id="emailInput"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-12 mt-2" style={{ textAlign: "right" }}>
          <button onClick={handleAddStudent} className="btn btn-primary ml-2">
            Add Student
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSubjects;
