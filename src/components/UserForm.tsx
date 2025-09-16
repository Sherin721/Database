import { useState, useRef, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export default function UserForm() {
  const { dispatch, editingUser } = useContext(UserContext)!;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setRole(editingUser.role);
      inputRef.current?.focus();
    }
  }, [editingUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    if (editingUser) {
      dispatch({
        type: "edit",
        user: { ...editingUser, name, email, role },
      });
    } else {
      dispatch({
        type: "add",
        user: { id: Date.now(), name, email, role, active: true },
      });
    }

    setName("");
    setEmail("");
    setRole("User");
  };

  const handleCancel = () => {
    dispatch({ type: "cancelEdit" });
    setName("");
    setEmail("");
    setRole("User");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{editingUser ? "Edit User" : " Add User"}</h3>
      <input
        ref={inputRef}
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option>User</option>
        <option>Admin</option>
        <option>Manager</option>
      </select>
      <button type="submit">{editingUser ? "Update" : "Add"}</button>
      {editingUser && <button onClick={handleCancel}>Cancel</button>}
    </form>
  );
}
