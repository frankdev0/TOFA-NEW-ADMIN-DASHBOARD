import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axios } from "../../pages/components/baseUrl";

export const AppContext = createContext();

// export function useAppContext() {
//   return useContext(AppContext);
// }

const AppState = ({ children }) => {
  const [user, setUser] = useState("");
  const [userLoading, setUserLoading] = useState(true);
  const [metrics, setMetrics] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const { data } = axios
  //     .get("/auth/current-user")
  //     .then((response) => {
  //       setUser(response.data.currentUser);
  //       setUserLoading(false);
  //       console.log("my data", data);
  //     })
  //     .catch((error) => {
  //       // navigate("/login");
  //       console.log(error);
  //       setUserLoading(false);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get("/admin/dashboard-metrics")
  //     .then((response) => {
  //       setMetrics(response.data.data);
  //       setUserLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setUserLoading(false);
  //     });
  // }, []);

  // const value = user;
  // if (!loading) {
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
  const value = {
    user,
    userLoading,
    metrics,
    setUser,
    setUserLoading,
    setMetrics,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppState;
