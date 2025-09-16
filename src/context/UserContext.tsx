import React, {
  createContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;   // ✅ added password
  role: string;
  active: boolean;
}

type Action =
  | { type: "add"; user: User }
  | { type: "edit"; user: User }
  | { type: "delete"; id: number }
  | { type: "toggle"; id: number }
  | { type: "startEdit"; user: User }
  | { type: "cancelEdit" }
  | { type: "login"; email: string; password: string }
  | { type: "logout" };

interface State {
  users: User[];
  editingUser: User | null;
  currentUser: User | null;   // ✅ track logged-in user
}

interface UserContextType {
  users: User[];
  dispatch: React.Dispatch<Action>;
  editingUser: User | null;
  currentUser: User | null;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add":
      return { ...state, users: [...state.users, action.user] };

    case "edit":
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.user.id ? action.user : u
        ),
        editingUser: null,
      };

    case "delete":
      return { ...state, users: state.users.filter((u) => u.id !== action.id) };

    case "toggle":
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.id ? { ...u, active: !u.active } : u
        ),
      };

    case "startEdit":
      return { ...state, editingUser: action.user };

    case "cancelEdit":
      return { ...state, editingUser: null };

    case "login": {
      const user = state.users.find(
        (u) =>
          u.email === action.email.trim() &&
          u.password === action.password.trim()
      );
      return { ...state, currentUser: user || null };
    }

    case "logout":
      return { ...state, currentUser: null };

    default:
      return state;
  }
}

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [savedUsers, setSavedUsers] = useLocalStorage<User[]>("users", []);
  const [state, dispatch] = useReducer(reducer, {
    users: savedUsers,
    editingUser: null,
    currentUser: null,
  });

  useEffect(() => {
    setSavedUsers(state.users);
  }, [state.users, setSavedUsers]);

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        dispatch,
        editingUser: state.editingUser,
        currentUser: state.currentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
