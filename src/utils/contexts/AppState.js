import React, { createContext, useContext, useEffect, useState } from "react";
import { axios } from "../../pages/components/baseUrl";

export const AppContext = createContext();

// export function useAppContext() {
//   return useContext(AppContext);
// }

const AppState = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("/auth/current-user")
      .then((response) => {
        setUser(response.data.currentUser);
        // setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  return <AppContext.Provider value={user}>{children}</AppContext.Provider>;
};

export default AppState;
