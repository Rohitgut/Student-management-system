import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiSearch } from "react-icons/bi";
import Pagination from "react-js-pagination";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";

export function Subject() {
  const navigate = useNavigate();
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
  const [currentClass, setCurrentClass] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(-1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage] = useState(5);

  const editSubjectHandle = (subject) => {
    setSelectedSubjectIndex(subject);
    navigate(`/students/addsubjects/${subject+1}`);
    console.log("subject///////////**********", subject);
    // onClick={() => editClassHandle(cls)}
  };

  // Dynamic input fields
  const [subjectInputs, setSubjectInputs] = useState([{ name: "" }]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.name &&
      subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // // Calculate the index of the first and last item based on the active page
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  useEffect(() => {
    // Retrieve data from local storage
    const localStorageData = localStorage.getItem("classes");
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      if (parsedData.classes) {
        setClasses(parsedData.classes);
      }
    }
  }, []);

  useEffect(() => {
    // get subjects from local storage via selected class
    if (selectedClass) {
      const localStorageData = localStorage.getItem("classes");
      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData);
        const selectedClassData = parsedData.classes.find(
          (cls) => cls.id === selectedClass
        );
        if (selectedClassData && selectedClassData.subjects) {
          setSubjects(selectedClassData.subjects);
        }
      }
    }
  }, [selectedClass]);

  // Function to handle adding a new subject input
  const handleAddSubjectInput = () => {
    const updatedSubjectInputs = [...subjectInputs, { name: "" }];
    setSubjectInputs(updatedSubjectInputs);
  };

  // Function to handle removing a subject input
  const handleRemoveSubjectInput = (index) => {
    const updatedSubjectInputs = [...subjectInputs];
    updatedSubjectInputs.splice(index, 1);
    setSubjectInputs(updatedSubjectInputs);
  };

  // Function to handle adding multiple subjects
  const handleAddSubjects = () => {
    if (!selectedClass) {
      alert("Please select a class first!");
      return;
    }

    // Extract subject names from subjectInputs state
    const newSubjects = subjectInputs
      .map((input) => input.name.trim())
      .filter(Boolean);

    if (newSubjects.length === 0) {
      alert("Subject names cannot be empty!");
      return;
    }
    // Update subjects state and local storage
    const updatedSubjects = [
      ...subjects,
      ...newSubjects.map((name) => ({ name, isActive: true })),
    ];
    setSubjects(updatedSubjects);
    if (selectedClass) {
      addSubjectsToLocalStorage(selectedClass, updatedSubjects);
    }

    // Clear input fields
    setSubjectInputs([{ name: "" }]);
  };

  const addSubjectsToLocalStorage = (classId, updatedSubjects) => {
    const localStorageData = localStorage.getItem("classes");
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      const updatedClasses = parsedData.classes.map((cls) => {
        if (cls.id === classId) {
          return { ...cls, subjects: updatedSubjects };
        }
        return cls;
      });

      const updatedData = {
        ...parsedData,
        classes: updatedClasses,
      };
      localStorage.setItem("classes", JSON.stringify(updatedData));
    }
  };
  const handleDropdownChange = (e) => {
    setSelectedClass(parseInt(e.target.value));
    setSubjects([]);
    setNewSubject("");
    setSelectedSubjectIndex(-1);
    setCurrentClass();
  };

  const handleAddSubject = () => {
    if (!selectedClass) {
      alert("Please select a class first!");
      return;
    }
    if (!isValidSubject(newSubject)) {
      alert("Invalid subject name!");
      return;
    }

    const isDuplicate = subjects.some(
      (subject) =>
        subject &&
        subject.name &&
        subject.name.toLowerCase() === newSubject.toLowerCase()
    );
    if (isDuplicate) {
      alert("Subject already exists!");
      return;
    }

    const updatedSubjects = [
      ...subjects,
      { name: newSubject.trim(), isActive: true },
    ];
    setSubjects(updatedSubjects);
    if (selectedClass) {
      addSubjectsToLocalStorage(selectedClass, updatedSubjects);
    }
    setNewSubject("");
  };

  const handleEditSubject = () => {
    if (!selectedClass) {
      alert("Please select a class first!");
      return;
    }

    if (!isValidSubject(newSubject)) {
      alert("Invalid subject name!");
      return;
    }

    const isDuplicate = subjects.some(
      (subject, index) =>
        subject &&
        subject.name &&
        index !== selectedSubjectIndex &&
        subject.name.toLowerCase() === newSubject.toLowerCase()
    );
    if (isDuplicate) {
      alert("Subject already exists!");
      return;
    }

    const updatedSubjects = [...subjects];
    updatedSubjects[selectedSubjectIndex] = {
      name: newSubject.trim(),
      isActive: true,
    };
    setSubjects(updatedSubjects);
    if (selectedClass) {
      addSubjectsToLocalStorage(selectedClass, updatedSubjects);
    }
    setNewSubject("");
    setSelectedSubjectIndex(-1);
  };

  const isValidSubject = (subject) => {
    return true;
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4"> Subject List</h2>

      {/* Dynamic input fields */}
      <div className="row">
        <div className="col-md-10"></div>

        <div className="col-md-2">
          {/* {selectedSubjectIndex === -1 ? (
            <Button onClick={handleAddSubjects} className="btn btn-primary ml-2">
            Add Subjects
          </Button>
          ) : (
            <Button variant="primary" onClick={handleEditSubject}>
              Edit Subject
            </Button>
          )} */}
          <div style={{ textAlign: "right" }} className="pb-2">
            <Link to="/students/addsubjects">
              <button style={buttonStyle}>Add Subjects</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-4">
          <select
            className="form-select"
            id="classDropdown"
            value={selectedClass}
            onChange={handleDropdownChange}
          >
            <option value="">Select a class</option>
            {classes.map((classItem) => (
              <option key={classItem.id} value={classItem.id}>
                {classItem.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-5"></div>
        <div className="col-md-3">
          <div className="input-group mb-3">
            <input
              className="form-control"
              type="text"
              placeholder="Search by subject name..."
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
            <th>Serial No</th>
            <th>Class Name</th>
            <th>Subject Name</th>
            <th style={{ width: "200px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubjects
            .slice(indexOfFirstItem, indexOfLastItem)
            .map((subject, index) => (
              <tr key={index}>
                <td>{(activePage - 1) * 5 + index + 1} </td>
                <td>{classes[selectedClass - 1].name}</td>
                <td>{subject.name}</td>
                <td>
                  <button
                    disabled={subject.isActive === false}
                    className="btn btn-info"
                    onClick={() => editSubjectHandle(index)}
                  >
                    Edit
                  </button>
                  &nbsp;
                  <button
                    className={`btn ${
                      subject.isActive ? "btn-secondary" : "btn-danger"
                    } ml-2`}
                    onClick={() => {
                      const updatedSubjects = [...filteredSubjects];
                      updatedSubjects[index].isActive =
                        !updatedSubjects[index].isActive;
                      setSubjects(updatedSubjects);
                      if (selectedClass) {
                        addSubjectsToLocalStorage(
                          selectedClass,
                          updatedSubjects
                        );
                      }
                    }}
                  >
                    {subject.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {filteredSubjects.length === 0 ? (
        <p>No record found</p>
      ) : (
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={filteredSubjects.length}
          pageRangeDisplayed={3}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      )}
    </div>
  );
}
