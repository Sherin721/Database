import { useState, useEffect } from "react";
import { UserProvider } from "./context/UserContext";
import Login from "./components/Login";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import { CiLogout } from "react-icons/ci";


export default function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    // Load initial state from localStorage
    const saved = localStorage.getItem("loggedIn");
    return saved === "true"; 
  });

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem("loggedIn", "true"); // save
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("loggedIn"); // clear
  };

  return (
    <UserProvider>
      <div style={{ padding: 20 }}>
        {loggedIn ? (
          <>
            <header
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h1>Home Page</h1>
              <button
                onClick={handleLogout}
                style={{ padding: "6px 12px", cursor: "pointer" }}
              >
                Logout <CiLogout/>
              </button>
            </header>

            <UserForm />
            <UserTable />
          </>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </UserProvider>
  );
}
