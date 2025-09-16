import { useLocalStorage } from './useLocalStorage';

interface User {
  email: string;
  password: string;
}

const initialUsers: User[] = [
  { email: "user1@example.com", password: "password123" },
  { email: "user2@example.com", password: "mypassword" },
];

export function useAuth() {
  const [users, setUsers] = useLocalStorage<User[]>("users", initialUsers);

  const login = (email: string, password: string): User | undefined => {
    const user = users.find(u => u.email === email && u.password === password);
    return user;
  };

  const register = (email: string, password: string): boolean => {
    if (users.some(u => u.email === email)) {
      return false; // User already exists
    }
    const newUser = { email, password };
    setUsers([...users, newUser]);
    return true;
  };
  
  return { users, login, register };
}