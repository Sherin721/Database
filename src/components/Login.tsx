import { useState, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { CiLogin } from "react-icons/ci";

// Dummy users database
interface User {
  email: string;
  password: string;
}

const initialUsers: User[] = [
  { email: "user1@example.com", password: "password123" },
  { email: "user2@example.com", password: "mypassword" },
];

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  // Initialize localStorage users
  useEffect(() => {
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify(initialUsers));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      setMessage("Login Successful!");
      localStorage.setItem("loggedInUser", email); // store logged-in user
      onLogin(); // trigger parent login action
    } else {
      setMessage("Access Denied");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding: 20, maxWidth: 300, margin: "0 auto" }}
    >
      <h2>Login</h2>

      <div style={{ marginBottom: 10 }}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: "100%", padding: 6, marginTop: 4 }}
          required
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Password</label>
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", padding: "6px 30px 6px 6px", marginTop: 4 }}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: 3,
              top: "45%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 18,
              color: "#5590a3ff",
            }}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
      </div>

      <button type="submit" style={{ padding: "6px 12px", cursor: "pointer" }}>
        Login <CiLogin />
      </button>

      {message && (
        <p
          style={{
            marginTop: 10,
            color: message === "Access Denied" ? "red" : "green",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
}
