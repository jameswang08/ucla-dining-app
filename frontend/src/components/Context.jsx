// Context.js
import React, { useState } from "react";

export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedUser, setSavedUser] = useState("");

  return (
    <Context.Provider
      value={{ loggedIn, setLoggedIn, savedUser, setSavedUser }}
    >
      {children}
    </Context.Provider>
  );
};
