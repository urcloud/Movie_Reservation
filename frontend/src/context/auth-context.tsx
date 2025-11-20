// AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { authApi } from '../apis/auth.api';
import LoadingScreen from '../pages/loading';

interface User {
  member_name: string;
  role_name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await authApi.login(email, password);

      if (res.ok) {
        await getUser();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const logout = async () => {
    try {
      const data = await authApi.logout();
      if (data.ok) {
        localStorage.removeItem('user');
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const data = await authApi.getUser();
      console.log('getUser:', data);

      if (data.ok) {
        const loadedUser: User = {
          member_name: data.member_name,
          role_name: data.role_name,
        };

        // 로컬스토리지 동기화
        localStorage.setItem('user', JSON.stringify(loadedUser));

        setUser(loadedUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      // 토큰 없음, 만료 등 → 로컬스토리지 정리
      localStorage.removeItem('user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 앱 시작 시 무조건 실행
    const init = async () => {
      await getUser();
    };
    init();
  }, []);

// ------------------------------
  // 🔵 loading 페이지 출력
  // ------------------------------
  if (loading) return <LoadingScreen />;
  
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
