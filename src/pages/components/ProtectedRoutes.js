import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, Outlet, useNavigate } from "react-router-dom";

// const useAuth = () => {
//   const user = { loggedIn: false };
//   return user && user.loggedIn;

// };

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    axios
      .get("/auth/current-user")
      .then((response) => {
        setCurrentUser(response.data.currentUser);
        console.log("this is from protected route", response.data.currentUser);
      })
      .catch((error) => {
        console.log(error.response.data);
        navigate("/login");
      });
  }, []);

  useEffect(() => {}, [currentUser]);

  // if (!currentUser) {
  //   return (
  //     <div
  //       className="spinner mx-auto"
  //       align="center"
  //       id="spinner"
  //       style={{
  //         position: "absolute",
  //         top: "calc(50% - 60px)",
  //         left: "calc(50% - 60px)",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         textAlign: "center",
  //         margin: "auto",
  //       }}
  //     ></div>
  //   );
  // }

  return <Outlet context={[currentUser]} />;
};

export default ProtectedRoutes;
