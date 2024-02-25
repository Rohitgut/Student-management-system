import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import Pagination from "react-bootstrap/Pagination";
import { useNavigate, useParams } from "react-router-dom";
function AddClass() {
  const navigate = useNavigate();
  const { id } = useParams();
  const initialData = localStorage.getItem("classes");
  const [classes, setJsonData] = useState(
    initialData ? JSON.parse(initialData) : { classes: [] }
  );
  const [selectedClass, setSelectedClass] = useState(
    classes.classes[id && id - 1]
  );
  const [newClass, setNewClass] = useState(selectedClass?.name || "");

  console.log("id***********", selectedClass, id);
  const [editClasses, setEditClaases] = useState(id);
  //   const [newClass, setNewClass] = useState("");

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 16px",
    marginLeft: "8px",
    cursor: "pointer",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20vh",
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
    navigate("/classes");
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
      navigate("/classes");
    }
  };
  return (
    <div>
      {/* <div style={containerStyle}>
            <h3>Add or Edit Classes:</h3>
            <Link to="/classes/addclass">
                <button style={buttonStyle}>Add Class</button>
            </Link>
            
        </div> */}
      <h3> {editClasses ? "Edit Class" : "Add Class"} </h3>
      <div className="row">
        <div class="col-md-6">
          <div style={{ textAlign: "left", paddingBottom: "10px" }}>
            {/* <Form.Label htmlFor="addClass">Add Class</Form.Label> */}
            <Form.Control
              type="text"
              id="addEditClass"
              value={newClass}
              onChange={(e) => setNewClass(e.target.value)}
              placeholder={editClasses ? "Edit a  Class" : "Add a Class"}
              aria-describedby="addEditClassBlock"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div style={{ textAlign: "right" }}>
            {editClasses ? (
              <Button variant="primary" onClick={editClass}>
                Edit Class
              </Button>
            ) : (
              <Button variant="primary" onClick={addClass}>
                Add Class
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddClass;
