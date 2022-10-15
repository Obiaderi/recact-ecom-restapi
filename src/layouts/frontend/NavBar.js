import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function NavBar(props) {
  let navigate = useNavigate();

  // Handle logout
  const logoutSubmit = (e) => {
    e.preventDefault();

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios
        .post("api/logout")
        .then((res) => {
          if (res.data.status === 200) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("authName");

            Swal.fire("Good job!", res.data.message, "success");

            navigate("/");
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
          }
        });
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="#">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="#">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Collection
              </Link>
            </li>
            {!localStorage.getItem("authToken") ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item mt-2">
                <button
                  type="button"
                  onClick={logoutSubmit}
                  className="btn btn-danger btn-sm text-white"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
