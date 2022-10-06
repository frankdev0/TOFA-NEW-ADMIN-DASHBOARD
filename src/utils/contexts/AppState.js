import React, { createContext, useContext, useEffect, useState } from "react";
import { axios } from "../../pages/components/baseUrl";

export const AppContext = createContext();

// export function useAppContext() {
//   return useContext(AppContext);
// }

const AppState = ({ children }) => {
  const [user, setUser] = useState("");
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/auth/current-user")
      .then((response) => {
        setUser(response.data.currentUser);
        setUserLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setUserLoading(false);
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
  const value = { user, userLoading };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppState;
