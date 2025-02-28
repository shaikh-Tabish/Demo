import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Alert } from "react-bootstrap";

const App = () => {
  const [inputFirst, setFirst] = useState("");
  const [inputLast, setLast] = useState("");
  const [inputBranch, setBranch] = useState("");
  const [editIndex, setEditIndex] = useState("");
  const [editFirst, setEditFirst] = useState("");
  const [editLast, setEditLast] = useState("");
  const [editBranch, setEditBranch] = useState("");
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState(() => {
    const storedData = localStorage.getItem("inputdata");
    return storedData ? JSON.parse(storedData) : [];
  });
  const handleFirst = (e) => {
    setFirst(e.target.value);
  };
  const handleLast = (e) => {
    setLast(e.target.value);
  };
  const handleBranch = (e) => {
    setBranch(e.target.value);
  };
  
const handleSubmit = (e) => {
  e.preventDefault();
  
  if (inputFirst===""|| inputLast==""||inputBranch==""||inputFirst==inputLast|| inputLast==inputBranch||inputBranch==inputFirst) {
    setShow(true);
    return;
  }
  const newId = inputValue.length ? inputValue[inputValue.length - 1].id+1 : 1;
    const data = {
      firstname: inputFirst,
      lastname: inputLast,
      branch: inputBranch,
      id:newId
    };
    const updatedInputValue = [...inputValue, data];
    setInputValue(updatedInputValue);
    localStorage.setItem("inputdata", JSON.stringify(updatedInputValue));
    setFirst("");
    setLast("");
    setBranch("");
  };
  
  const handleEdit = (data, index) => {
    setEditIndex(index);
    setEditFirst(data.firstname);
    setEditLast(data.lastname);
    setEditBranch(data.branch);
  };
  const updateValue = () => {
    const currentItem=inputValue[editIndex];
    let updatedData = {
      id:currentItem.id,
      firstname: editFirst,
      lastname: editLast,
      branch: editBranch,
    };

    console.log("updatedData", updatedData);
    const updatedInputValue = inputValue.map((data, index) =>
      index === editIndex ? updatedData : data
    );
    setInputValue(updatedInputValue);
    localStorage.setItem("inputdata", JSON.stringify(updatedInputValue));
  };

  const handleDelete = (index) => {
    const updatedInputValue = inputValue.filter((g, i) => i !== index);
    setInputValue(updatedInputValue);
    localStorage.setItem("inputdata", JSON.stringify(updatedInputValue));
  };
  console.log(inputValue.length);
  
  return (
    <div>
       {show &&(
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
            pleas fill the datails!
            </p>
          </Alert>
           )};
      <form className="Table" onSubmit={handleSubmit}>
        <div className="first-name">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            onChange={handleFirst}
            type="text"
            value={inputFirst}
            placeholder="Enter your First Name"
          />
        </div>
        <div className="last-name">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            onChange={handleLast}
            type="text"
            value={inputLast}
            placeholder="Enter your Last Name"
          />
        </div>
        <div className="branch">
          <label htmlFor="branch">Branch</label>
          <input
            type="text"
            placeholder="Enter your Branch"
            id="branch"
            value={inputBranch}
            onChange={handleBranch}
          />
        </div>
        <div className="btn">
          <button type="submit">Submit</button>
        </div>
      </form>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Branch</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {inputValue.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td>{item.branch}</td>
              <td>
                {" "}
                <button
                  type="button"
                  onClick={() => handleEdit(item, index)}
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(index)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                UPDATE DETAILS
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="" className="d-flex flex-column">
                <label htmlFor="">Frist Name</label>
                <input
                  type="text"
                  onChange={(e) => setEditFirst(e.target.value)}
                  value={editFirst}
                />
                <label htmlFor="Last Name">Last Name</label>
                <input
                  type="text"
                  onChange={(e) => setEditLast(e.target.value)}
                  value={editLast}
                />
                <label htmlFor="">Branch</label>
                <input
                  type="text"
                  onChange={(e) => setEditBranch(e.target.value)}
                  value={editBranch}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => updateValue()}
                data-bs-dismiss="modal"
              >
                Update
              </button>
              {/* <button onClick={updateValue} value={inputValue} type="button" className="btn btn-primary">Update</button> */}
            </div>
          </div>
        </div>
      </div>
              <h1>Total Data:{inputValue.length}</h1>
    </div>
  );
};
export default App;
