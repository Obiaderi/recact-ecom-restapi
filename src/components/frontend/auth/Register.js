import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

function Register(props) {
  // use History hook to redirect user to login page
  let navigate = useNavigate();
  const [registerInput, setRegisterInput] = useState({
    name: "",
    email: "",
    password: "",
    error_list: [],
  });

  // Handle input field changes
  const handleInput = (e) => {
    e.persist();
    setRegisterInput({ ...registerInput, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const registerSubmit = (e) => {
    e.preventDefault();
    // console.log(registerInput);

    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios
        .post("api/register", data)
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            localStorage.setItem("authToken", res.data.access_token);
            localStorage.setItem("authName", res.data.user.name);
            Swal.fire("Good job!", res.data.message, "success");

            navigate("/");
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            setRegisterInput({
              ...registerInput,
              error_list: error.response.data.errors,
            });
          }
        });
    });
  };

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Register</h4>
            </div>
            <div className="card-body">
              <form onSubmit={registerSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleInput}
                    value={registerInput.name}
                    className="form-control"
                  />
                  <span>{registerInput.error_list.name}</span>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleInput}
                    value={registerInput.email}
                    className="form-control"
                  />
                  <span>{registerInput.error_list.email}</span>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleInput}
                    value={registerInput.password}
                    className="form-control"
                  />
                  <span>{registerInput.error_list.password}</span>
                </div>
                <div className="form-group mb-3">
                  <button className="btn btn-primary">Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
