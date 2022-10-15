import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Login(props) {
  let navigate = useNavigate();

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
    error_list: [],
  });

  // Handle input field changes
  const handleInput = (e) => {
    e.persist();
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const loginSubmit = (e) => {
    e.preventDefault();
    // console.log(loginInput);

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios
        .post("api/login", data)
        .then((res) => {
          if (res.data.status === 200) {
            localStorage.setItem("authToken", res.data.access_token);
            localStorage.setItem("authName", res.data.user.name);
            Swal.fire("Good job!", res.data.message, "success");

            if (res.data.user.role_as === 1) {
              navigate("/admin");
            } else {
              navigate("/");
            }
          }
          if (res.data.status === 401) {
            Swal.fire("Oops...", res.data.message, "warning");
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            setLoginInput({
              ...loginInput,
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
              <h4>Login</h4>
            </div>
            <div className="card-body">
              <form onSubmit={loginSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleInput}
                    value={loginInput.email}
                    className="form-control"
                  />
                  <span>{loginInput.error_list.email}</span>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleInput}
                    value={loginInput.password}
                    className="form-control"
                  />
                  <span>{loginInput.error_list.password}</span>
                </div>
                <div className="form-group mb-3">
                  <button className="btn btn-primary">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
