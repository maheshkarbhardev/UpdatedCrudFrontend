import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Home = () => {
  const [employee, setEmployee] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("firstName");
  const [sortOrder, setSortOrder] = useState("ASC");

  const fetchEmployee = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setEmployee(response.data);
  };

  const searchEmployee = async (searchTerm) => {
    const response = await axios.get(
      `http://localhost:5000/api/search?firstName=${searchTerm}&lastName=${searchTerm}&email=${searchTerm}&phoneNumber=${searchTerm}`
    );

    setEmployee(response.data);
  };

  const sortEmployee = async (field, order) => {
    try {
      const response = await axios.get("http://localhost:5000/api/sort", {
        params: {
          sortField: field,
          sortOrder: order,
        },
      });
      setEmployee(response.data);
    } catch (error) {
      console.error("Error sorting:", error);
      toast.error("Sorting failed.");
    }
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
    if (searchTerm) {
      searchEmployee(searchTerm);
    } else {
      fetchEmployee();
    }
  }, [searchTerm]);

  useEffect(() => {
    sortEmployee(sortField, sortOrder);
  }, [sortField, sortOrder]);

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

      <div style={{ display: "flex" , flexDirection:'row', justifyContent:'center'}}>
        <div>
          <input
            style={{ width: "500px" }}
            type="text"
            value={searchTerm}
            placeholder="Search By FirstName ,LastName, Email , PhoneNumber"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <select
            onChange={(e) => setSortField(e.target.value)}
            value={sortField}
          >
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="email">Email</option>
          </select>
        </div>

        <div>
          <select
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
          >
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
        </div>
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
