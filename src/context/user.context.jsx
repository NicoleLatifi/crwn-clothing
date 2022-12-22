import { createContext, useEffect, useState } from "react";

import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

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

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
