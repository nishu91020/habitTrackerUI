import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
    token: string | null;
    user: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<string | null>(null);
    
    const login = (token: string) => {
        console.log('login context token', token);
        setToken(token);
        const decodedToken = jwtDecode(token);
        const sub = decodedToken.sub as string | undefined;
        setUser(sub ?? null);
    }
    const logout = () => {
        setToken(null);
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    ); 
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};