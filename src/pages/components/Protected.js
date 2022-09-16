import React, { useContext, useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AppContext } from "../../utils/contexts/AppState";

const Protected = ({ allowedRoles }) => {
  const isAuth = useContext(AppContext);
  console.log("these are the logged in users", isAuth);

  return isAuth?.type?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default Protected;
