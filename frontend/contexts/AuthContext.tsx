// Packages
import { createContext, ReactNode, useState } from "react";
import Router from "next/router";

// Cookie
import { setCookie } from "nookies";

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
  user: User;
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

  const isAuthenticated = !!user;

  // -------------------------------------------------
  // Functions
  // -------------------------------------------------

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("sessions", {
        email,
        password,
      });

      const { permissions, roles, token, refreshToken } = response.data;

      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });
      setCookie(undefined, "nextauth.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setUser({
        email,
        permissions,
        roles,
      });

      Router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  // -------------------------------------------------
  // Return
  // -------------------------------------------------

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
