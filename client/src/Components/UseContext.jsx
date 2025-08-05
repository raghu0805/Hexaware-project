import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const UserContext = createContext(null);

// Custom hook to access the user context
export function useUser() {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

// Provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");

    if (storedUserId) {
      fetch(`http://localhost:5000/api/userdetails/${storedUserId}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data); // full user details from DB
        })
        .catch((err) => {
          console.error("Error fetching user details:", err);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
