import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Pagination from "react-js-pagination";
import { Link, useNavigate } from "react-router-dom";
export function Class() {
  const navigate = useNavigate();

  const initialData = localStorage.getItem("classes");
  const [classes, setJsonData] = useState(
    initialData ? JSON.parse(initialData) : { classes: [] }
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
  const [newClass, setNewClass] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activePage, setActivePage] = useState(1);
  const classesPerPage = 5;
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  const editClassHandle = (cls) => {
    navigate(`classes/addclass/${cls.id}`);
    console.log("addclass**********",cls)
    setNewClass(cls.name);
    setSelectedClass(cls);
  };

  const toggleClassStatus = (id) => {
    const updatedClasses = classes.classes.map((cls) => {
      if (cls.id === id) {
        return { ...cls, status: cls.status === 1 ? 0 : 1 }; // Toggle class status
      }
      return cls;
    });

    const updatedData = {
      ...classes,
      classes: updatedClasses,
    };

    setJsonData(updatedData);
    localStorage.setItem("classes", JSON.stringify(updatedData));
  };

  const addClass = () => {
    const trimmedClassName = newClass.trim();

    // Validation: Check if class number is between 1 and 12
    const classNumber = parseInt(trimmedClassName.replace("class ", ""));
    if (!/^class [1-9]|1[0-2]$/.test(trimmedClassName) || classNumber <= 0) {
      alert(
        "Invalid class number. Please enter a valid class number from 1 to 12."
      );
      return;
    }

    if (trimmedClassName === "") {
      alert("Class name cannot be empty!");
      return;
    }

    const id = initialData ? JSON.parse(initialData).classes.length + 1 : 1;
    const newClassObj = { id, name: trimmedClassName, status: 1 };

    const updatedData = {
      ...classes,
      classes: [...classes.classes, newClassObj],
    };

    setJsonData(updatedData);
    localStorage.setItem("classes", JSON.stringify(updatedData));
    setNewClass(""); // Clear the input field
  };

  const editClass = () => {
    const trimmedClassName = newClass.trim();
    if (trimmedClassName === "") {
      alert("Class name cannot be empty!");
      return;
    }

    if (selectedClass) {
      const updatedClasses = classes.classes.map((cls) => {
        if (cls.id === selectedClass.id) {
          return { ...cls, name: trimmedClassName };
        }
        return cls;
      });

      const updatedData = {
        ...classes,
        classes: updatedClasses,
      };

      setJsonData(updatedData);
      localStorage.setItem("classes", JSON.stringify(updatedData));
      setNewClass("");
      setSelectedClass(null);
    }
  };

  const handleSearch = () => {
    const foundClass = classes.classes.find(
      (cls) => cls.name.toLowerCase() === searchTerm.toLowerCase()
    );

    if (foundClass) {
      setNewClass(foundClass.name);
      setSelectedClass(foundClass);
    } else {
      alert("Class not found. Please add the class first.");
    }
  };
  useEffect(() => {
    localStorage.setItem("classes", JSON.stringify(classes));
  }, [classes]);

  const indexOfLastClass = activePage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = classes.classes.slice(
    indexOfFirstClass,
    indexOfLastClass
  );
  return (
    <div className="container">
      <h2> Class List</h2>
      <div className="form-group">
        <div style={{ textAlign: "right" }} className="pb-2">
          <Link to="/classes/addclass">
            <button style={buttonStyle}>Add Class</button>
          </Link>
        </div>
      </div>

      <div className="row p-2" style={{ textAlign: "right" }}>
        <div className="col-md-7"></div>
        <div className="col-md-4">
          {/* Search bar */}
          <Form.Control
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search class..."
          />
        </div>
        <div className="col-md-1">
          {/* Search button */}
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>class id</th>
            <th>Class No.</th>
            {/* <th>Status</th> */}
            <th style={{ width: "200px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {classes.classes.length === 0 ? (
            <tr>
              <td colSpan="3">No Data Found</td>
            </tr>
          ) : (
            currentClasses.map((cls, index) => (
              <tr key={cls.id}>
                <td>{index + 1 + indexOfFirstClass}</td>
                <td>{cls.name}</td>
                {/* <td>{cls.status}</td> */}
                <td>
                  <button
                    disabled={cls.status === 0}
                    className={`btn btn-info mr-2 ${
                      cls.status === 1 ? "active-button" : "inactive-button"
                    }`}
                    onClick={() => editClassHandle(cls)}
                  >
                    Edit
                  </button>
                  &nbsp; {/* Add a non-breaking space */}
                  <button
                    className={`btn ${
                      cls.status === 1 ? "btn-secondary" : "btn-danger"
                    }`}
                    onClick={() => toggleClassStatus(cls.id)}
                  >
                    {cls.status === 1 ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <div className="pagination">
        <Pagination
          activePage={activePage}
          itemsCountPerPage={classesPerPage}
          totalItemsCount={classes.classes.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </div>
  );
}
