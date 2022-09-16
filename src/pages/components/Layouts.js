import React from "react";
import { Outlet } from "react-router-dom";

const Layouts = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default Layouts;
