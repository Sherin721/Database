import { useContext, useState } from "react";
import { UserContext, User } from "../context/UserContext";

export default function UserTable() {
  const { users, dispatch } = useContext(UserContext)!;
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        placeholder="Search user..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u: User) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.active ? "Active " : "Inactive "}</td>
              <td>
                <button onClick={() => dispatch({ type: "toggle", id: u.id })}>
                  Toggle
                </button>
                <button onClick={() => dispatch({ type: "startEdit", user: u })}>
                  Edit
                </button>
                <button onClick={() => dispatch({ type: "delete", id: u.id })}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={5}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
