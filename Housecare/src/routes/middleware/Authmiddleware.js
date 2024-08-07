import React from "react";
import { Navigate } from "react-router-dom";

const Authmiddleware = (props) => {
  const isAdmin = localStorage.getItem("HomecareAdmin") || localStorage.getItem("Superadmin");
  // const isAdmin = localStorage.getItem("token");
  if (isAdmin) {
    return <React.Fragment>{props.children}</React.Fragment>;
  } else {
    return <Navigate to="/housecare" />;
  }
};

export default Authmiddleware;
