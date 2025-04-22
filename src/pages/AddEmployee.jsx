import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  passwords: "",
  confirmPasswords: "",
  age: "",
  gender: "Male",
  department: "Manager",
  interests: [],
  birthDate: "",
};
const AddEmployee = () => {
  const [employee, setEmployee] = useState(initialValues);
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    passwords,
    confirmPasswords,
    age,
    gender,
    department,
    interests,
    birthDate,
  } = employee;

  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const handleCheckBoxChange = (e) => {
    const { value, checked } = e.target;

    setEmployee((prev) => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value]
        : prev.interests.filter((interest) => interest !== value),
    }));
  };

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/get/${id}`).then((resp) => {
        setEmployee({
          ...resp.data[0],
          interests: Array.isArray(resp.data[0].interests)
            ? resp.data[0].interests
            : resp.data[0].interests.split(","),
        });
      });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !passwords ||
      !confirmPasswords ||
      !age ||
      !gender ||
      !department ||
      !interests ||
      !birthDate
    ) {
      toast.error("Please Fill All Fields.");
    } else {
      if (!id) {
        axios
          .post("http://localhost:5000/api/post", {
            firstName,
            lastName,
            email,
            phoneNumber,
            passwords,
            confirmPasswords,
            age,
            gender,
            department,
            interests,
            birthDate,
          })
          .then(() => {
            setEmployee({
              firstName: "",
              lastName: "",
              email: "",
              phoneNumber: "",
              passwords: "",
              confirmPasswords: "",
              age: "",
              gender: "Male",
              department: "Manager",
              interests: [],
              birthDate: "",
            });
          })
          .catch((err) => {
            toast.error(err.response.data);
          });
        toast.success("Employee Added Successfully");
      } else {
        axios
          .put(`http://localhost:5000/api/update/${id}`, {
            firstName,
            lastName,
            email,
            phoneNumber,
            passwords,
            confirmPasswords,
            age,
            gender,
            department,
            interests,
            birthDate,
          })
          .then(() => {
            setEmployee({
              firstName: "",
              lastName: "",
              email: "",
              phoneNumber: "",
              passwords: "",
              confirmPasswords: "",
              age: "",
              gender: "Male",
              department: "Manager",
              interests: [],
              birthDate: "",
            });
          })
          .catch((err) => {
            toast.error(err.response.data);
          });

        toast.success("Employee Updated Successfully.");
      }

      setTimeout(() => {
        navigate("/");
      }, 300);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <h1>Employee Registartion Form</h1>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">FirstName:- </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName || ""}
            placeholder="Enter FirstName"
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="lastName">LastName:- </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName || ""}
            placeholder="Enter LastName"
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="email">Email:- </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email || ""}
            placeholder="Enter Email"
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="phoneNumber">Phone Number:- </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber || ""}
            placeholder="Enter PhoneNumber"
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="passwords">Password:- </label>
          <input
            type="password"
            id="passwords"
            name="passwords"
            value={passwords || ""}
            placeholder="Enter Password"
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="confirmPasswords">Confirm Password:- </label>
          <input
            type="password"
            id="confirmPasswords"
            name="confirmPasswords"
            value={confirmPasswords || ""}
            placeholder="Enter ConfirmPassword"
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="age">Age:- </label>
          <input
            type="number"
            id="age"
            name="age"
            value={age || ""}
            placeholder="Enter Age"
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="gender">Gender:- </label>
          <input
            type="radio"
            id="gender"
            name="gender"
            value="Male"
            checked={gender === "Male"}
            onChange={handleChange}
          />
          Male
          <input
            type="radio"
            id="gender"
            name="gender"
            value="Female"
            checked={gender === "Female"}
            onChange={handleChange}
          />
          Female
          <br />
          <br />
          <label htmlFor="department">Department:- </label>
          <select
            name="department"
            id="department"
            value={department || "Manager"}
            onChange={handleChange}
          >
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
            <option value="Tester">Tester</option>
          </select>
          <br />
          <br />
          <label htmlFor="interests">Interests:- </label>
          <label>
            <input
              type="checkbox"
              name="interests"
              value="Coding"
              checked={interests.includes("Coding")}
              onChange={handleCheckBoxChange}
            />
            Coding
          </label>
          <label>
            <input
              type="checkbox"
              name="interests"
              value="Sports"
              checked={interests.includes("Sports")}
              onChange={handleCheckBoxChange}
            />
            Sports
          </label>
          <label>
            <input
              type="checkbox"
              name="interests"
              value="Reading"
              checked={interests.includes("Reading")}
              onChange={handleCheckBoxChange}
            />
            Reading
          </label>
          <br />
          <br />
          <label htmlFor="birthDate">Birthdate:- </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={birthDate || ""}
            placeholder="Enter Birthdate"
            onChange={handleChange}
          />
          <div style={{ display: "flex" }}>
            <button type="submit" >Submit</button>

            <Link to="/">
              <button>Go Back</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
