import React, { createContext, useContext } from "react";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }) {
  const value = { email: "nnaemeka@tradersofafrica", password: "password" };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
