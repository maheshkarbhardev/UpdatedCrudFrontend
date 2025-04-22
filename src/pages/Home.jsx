import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Home = () => {
  const [employee, setEmployee] = useState([]);

  const fetchEmployee = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setEmployee(response.data);
  };

  const deleteEmployee = (id) => {
    if (window.confirm("Do You want to delete this employee?")) {
      axios.delete(`http://localhost:5000/api/delete/${id}`);
      toast.success("Employee Deleted Successfully");
    }

    setTimeout(() => {
      fetchEmployee();
    }, 300);
  };

  useEffect(() => {
    fetchEmployee();
  }, []);
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <h1 style={{ fontWeight: "600", color: "purple" }}>Employee List</h1>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Link to="/addEmployee">
          <button
            style={{
              padding: "7px 10px",
              background: "purple",
              color: "white",
              borderRadius: "5px",
              marginRight: "10px",
            }}
          >
            Add Employee
          </button>
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <table style={{ width: "80%" }}>
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Interests</th>
              <th>BirthDate</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employee.map((item, index) => {
              const formattedDate = new Date(item.birthDate)
                .toISOString()
                .split("T")[0];
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.age}</td>
                  <td>{item.gender}</td>
                  <td>{item.department}</td>
                  <td>{item.interests}</td>
                  <td>{formattedDate}</td>
                  <td>
                    <Link to={`/editEmployee/${item.id}`}>
                      <button
                        style={{
                          padding: "7px 10px",
                          background: "yellow",
                          fontWeight: "bold",
                          borderRadius: "5px",
                          marginRight: "10px",
                        }}
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      style={{
                        padding: "7px 10px",
                        background: "red",
                        fontWeight: "bold",
                        borderRadius: "5px",
                        marginRight: "10px",
                      }}
                      onClick={() => deleteEmployee(item.id)}
                    >
                      Delete
                    </button>

                    <Link to={`/view/${item.id}`}>
                      <button
                        style={{
                          padding: "7px 10px",
                          background: "lightgreen",
                          fontWeight: "bold",
                          borderRadius: "5px",
                          marginRight: "10px",
                        }}
                      >
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
