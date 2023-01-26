import React, { createContext, useState } from "react";

export const AppContext = createContext();

const AppState = ({ children }) => {
  const [user, setUser] = useState("");
  const [userLoading, setUserLoading] = useState(true);
  const [metrics, setMetrics] = useState("");

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
