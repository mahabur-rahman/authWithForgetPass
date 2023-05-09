import React, { createContext, useState } from "react";

// create a context
export const LoginContext = createContext("");

// context provider
const Context = ({ children }) => {
  const [loginData, setLoginData] = useState("");

  return (
    <LoginContext.Provider
      value={{
        loginData,
        setLoginData,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default Context;
