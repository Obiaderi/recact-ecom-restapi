import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../layouts/frontend/NavBar";

function BaseIndex(props) {
  return (
    <div>
      <NavBar />
      <div className="container py-5">
        <Outlet />
      </div>
    </div>
  );
}

export default BaseIndex;
