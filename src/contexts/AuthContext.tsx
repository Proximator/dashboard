import { ReactNode, createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    businessId: number;
    brandId: number;
}

export const AuthContext = createContext<AuthContextType>({
    businessId: 1,
    brandId: 1
} as AuthContextType);


export const AuthProvider = ({ children } : { children: ReactNode }): JSX.Element => {

    const [businessId] = useState(1);
    const [brandId] = useState(1);

    return <AuthContext.Provider value={{ businessId, brandId }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType =>
    useContext(AuthContext) as AuthContextType;
