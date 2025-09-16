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
  role: string;
  active: boolean;
}

type Action =
  | { type: "add"; user: User }
  | { type: "edit"; user: User }
  | { type: "delete"; id: number }
  | { type: "toggle"; id: number }
  | { type: "startEdit"; user: User }
  | { type: "cancelEdit" };

interface State {
  users: User[];
  editingUser: User | null;
}

interface UserContextType {
  users: User[];
  dispatch: React.Dispatch<Action>;
  editingUser: User | null;
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
