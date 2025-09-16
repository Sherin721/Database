import { useState } from "react";
import { UserProvider } from "./context/UserContext";
import Login from "./components/Login";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import { CiLogout } from "react-icons/ci";

export default function App() {
  // Store logged-in user's email (null if not logged in)
  const [loggedInUser, setLoggedInUser] = useState<string | null>(
    () => localStorage.getItem("loggedInUser")
  );

  // Called by Login component when login succeeds
  const handleLogin = (email: string) => {
    setLoggedInUser(email);
    localStorage.setItem("loggedInUser", email);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <UserProvider>
      <div style={{ padding: 20 }}>
        {loggedInUser ? (
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
                Logout <CiLogout />
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
