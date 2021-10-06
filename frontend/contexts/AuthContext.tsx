// Packages
import { createContext } from "react";

// Types
import {
  AuthContextData,
  AuthProviderChildren,
  SignInCredentials,
} from "./types";

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderChildren) {
  const isAuthenticated = false;

  async function signIn({ email, password }: SignInCredentials) {
    console.log({ email, password });
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
