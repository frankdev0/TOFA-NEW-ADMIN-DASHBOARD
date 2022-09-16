import React, { createContext, useContext, useEffect, useState } from "react";
import { axios } from "../../pages/components/baseUrl";

export const AppContext = createContext();

// export function useAppContext() {
//   return useContext(AppContext);
// }

const AppState = ({ children }) => {
  const [users, setUsers] = useState("");
  useEffect(() => {
    axios
      .get("/auth/current-user")
      .then((response) => {
        setUsers(response.data.currentUser);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const value = users;

  return <AppContext.Provider value={users}>{children}</AppContext.Provider>;
};

export default AppState;
