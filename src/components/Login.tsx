import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Login() {
  const { dispatch, currentUser } = useContext(UserContext)!;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "login", email, password });
    if (currentUser) {
      setMessage("Login Successful!");
    } else {
      setMessage("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      {message && <p>{message}</p>}
    </form>
  );
}
