import { createContext, useState } from "react";

// the value you want to access
export const UserContext = createContext({
  // default value
  currentUser: null,
  setCurrentUser: () => null,
});

// gives the children access to the UserContext values
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
