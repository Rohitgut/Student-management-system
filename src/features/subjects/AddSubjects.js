import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { BiSearch } from "react-icons/bi";
// import Pagination from "react-js-pagination";
// import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";

function AddSubjects() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("subject edit id**********", id);
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
    navigate(`/subjects`);
  };
  const editSubjectHandle = (subject) => {
    navigate(`subject***********/${subject}`);
    console.log("subject///////////**********", subject);
    // onClick={() => editClassHandle(cls)}
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
      <h2 className="mb-4">
        {" "}
        {selectedSubjectIndex === -1 ? "Add" : "Edit"} Subject
      </h2>

      {/* Dynamic input fields */}
      <div className="row">
        <div className="col-md-5">
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
        <div className="col-md-5">
          {subjectInputs.map((input, index) => (
            <div key={index} className="input-group mb-2">
              <input
                className="form-control"
                type="text"
                placeholder="Subject Name"
                value={input.name}
                onChange={(e) => {
                  const updatedInputs = [...subjectInputs];
                  updatedInputs[index].name = e.target.value;
                  setSubjectInputs(updatedInputs);
                }}
              />
              {index === 0 && ( // Only show "+" button for the first input
                <button
                  className="btn btn-success"
                  onClick={handleAddSubjectInput}
                >
                  +
                </button>
              )}
              {index > 0 && ( // Show "-" button for all inputs except the first one
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveSubjectInput(index)}
                >
                  -
                </button>
              )}
            </div>
          ))}
        </div>

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
          <Button onClick={handleAddSubjects} className="btn btn-primary ml-2">
            Add Subjects
          </Button>
        </div>
      </div>
    </div>
  );
}
export default AddSubjects;
