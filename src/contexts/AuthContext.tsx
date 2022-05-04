import { useRouter } from 'next/router';
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  businessId: number;
  brandId: number;
  token: string | null;
  login: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  businessId: 1,
  brandId: 1,
  token: null,
  login: () => {}
} as AuthContextType);

export const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    if (typeof window !== 'undefined') {
      const router = useRouter();

      const { token } = useAuth();
      if (!token) {
        router.push('/');
        return null;
      }
      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [businessId] = useState(2);
  const [brandId] = useState(1);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const tokenValue = localStorage.getItem('token');
    setToken(tokenValue);
  }, []);

  const login = (email, password) => {
    localStorage.setItem('token', 'hello');
    setToken('hello');
    router.push('/dashboard/default');
  };

  return <AuthContext.Provider value={{ businessId, brandId, token, login }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => useContext(AuthContext) as AuthContextType;
