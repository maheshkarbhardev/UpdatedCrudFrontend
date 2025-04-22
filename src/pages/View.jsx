import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const View = () => {
  const [employee, setEmployee] = useState({});
  const { id } = useParams();

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

  const formattedDate =
    employee.birthDate && !isNaN(new Date(employee.birthDate))
      ? new Date(employee.birthDate).toISOString().split("T")[0]
      : "";

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <h1>Employee Details</h1>
      </div>

      <div>
        <strong>FirstName:- </strong>
        <span>{employee.firstName}</span>
        <br />
        <br />

        <strong>LastName:- </strong>
        <span>{employee.lastName}</span>
        <br />
        <br />

        <strong>Email:- </strong>
        <span>{employee.email}</span>
        <br />
        <br />

        <strong>Phone Number:- </strong>
        <span>{employee.phoneNumber}</span>
        <br />
        <br />

        <strong>Age:- </strong>
        <span>{employee.age}</span>
        <br />
        <br />

        <strong>Gender:- </strong>
        <span>{employee.gender}</span>
        <br />
        <br />

        <strong>Department:- </strong>
        <span>{employee.department}</span>
        <br />
        <br />

        <strong>Interests:- </strong>
        <span>
          {employee.interests && Array.isArray(employee.interests)
            ? employee.interests.join(", ")
            : ""}
        </span>
        <br />
        <br />

        <strong>Birthdate:- </strong>
        <span>{formattedDate}</span>
        <br />
        <br />

        <Link to="/">
          <button>Go Back</button>
        </Link>
      </div>
    </div>
  );
};

export default View;
