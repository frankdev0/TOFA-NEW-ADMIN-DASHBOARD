// import React, { createContext, useEffect, useReducer, useState } from "react";
// import { axios } from "../../pages/components/baseUrl";
// import AuthReducer from "./AuthReducer";

// const INITIAL_STATE = {
//   currentUser: null,
// };

// export const AuthContext = createContext(INITIAL_STATE);

// export const AuthContextProvider = ({ children }) => {
//   const [users, setUsers] = useState("");

//   useEffect(() => {
//     const { data } = axios.get("/auth/employees");
//     console.log(data);
//     setUsers(data.data);
//   }, []);
//   console.log(users);
//   const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

//   return (
//     <AuthContext.Provider value={{ user: state.user, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
