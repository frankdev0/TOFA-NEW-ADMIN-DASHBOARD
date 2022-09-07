import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";

// const useAuth = () => {
//   const user = { loggedIn: false };
//   return user && user.loggedIn;

// };

const ProtectedRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/auth/current-user")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        navigate("/");
      });
  }, []);

  return <Outlet />;
};

export default ProtectedRoutes;
