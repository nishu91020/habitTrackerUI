import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useContext, useState } from "react";
import { useEffect } from "react";

interface AuthContextType {
  token: string | null;
  user: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const getInitialState = () => {
    if (typeof window !== "undefined") {
    const currentToken = sessionStorage.getItem("token");
    return currentToken ? currentToken : null;
    }
    return null;
  };
  const [token, setToken] = useState<string | null>(getInitialState);
  const [user, setUser] = useState<string | null>(null);

  const setCurrentUser = (token: string | null) => {
    if (token) {
        const decodedToken = jwtDecode(token);
        const sub = decodedToken.sub as string | undefined;
        setUser(sub ?? null);
    } else {
        setUser(null);
    }
  }

  useEffect(() => {
    if(typeof window !== "undefined") {
        sessionStorage.setItem("token", token ?? "");
        setCurrentUser(token);
    }
  }, [user]);

  const login = (token: string) => {
    console.log("login context token", token);
    setToken(token);
    setCurrentUser(token);
  };
  const logout = () => {
    setToken(null);
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
