import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export function useUser() {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export function UserProvider({ children }) {
  const [userDetail, setUser] = useState(null);
const [countDetail, setCountDetail] = useState({
  total: 0,
  active: 0,
  onBench: 0,
  training: 0,
});
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (!storedUserId) return;

    const today = new Date().toISOString().split("T")[0];
    const [year, month] = today.split("-").map(Number);
    const totalDays = new Date(year, month, 0).getDate();

    // Fetch attendance
    fetch(`http://localhost:5000/calculate-attendance-percentage?days=${totalDays}&userid=${storedUserId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Attendance Percentage:", data);
      })
      .catch((err) => console.error("Attendance fetch error:", err));

    // Fetch user details
    fetch(`http://localhost:5000/api/userdetails/${storedUserId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error("User fetch error:", err);
      });
      //get count of active,total,onbench,training
 fetch(`http://localhost:5000/count`)
  .then((res) => res.json())
  .then((data) => {
    console.log("Count details:", data);
    setCountDetail(data); // ✅ Save all counts
  })
  .catch((err) => {
    console.error("User fetch error:", err);
  });

  }, []);

  return (
    <UserContext.Provider value={{ countDetail,userDetail, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
