// Packages
import { createContext, ReactNode, useState } from "react";

// Services
import { api } from "../services/api";

// -------------------------------------------------
// Types
// -------------------------------------------------
type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
};

type AuthProviderChildren = {
  children: ReactNode;
};

// -------------------------------------------------
// Context
// -------------------------------------------------
export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderChildren) {
  // -------------------------------------------------
  // States
  // -------------------------------------------------

  const [user, setUser] = useState<User>();

  // -------------------------------------------------
  // Constants
  // -------------------------------------------------

  const isAuthenticated = false;

  // -------------------------------------------------
  // Functions
  // -------------------------------------------------

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("sessions", {
        email,
        password,
      });

      const { permissions, roles } = response.data;

      setUser({
        email,
        permissions,
        roles,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // -------------------------------------------------
  // Return
  // -------------------------------------------------

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
