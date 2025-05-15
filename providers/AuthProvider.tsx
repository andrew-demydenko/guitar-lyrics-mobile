import { useRouter } from "expo-router";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getCurrentUser } from "@/api/user";
import { User } from "@/entities/user";
import { clearAuthData } from "@/lib/auth";
const isAuthPage = (pathname: string) => {
  const authPages = ["/login", "/register"];
  return authPages.includes(pathname);
};

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { pathname } = window.location;
      const isAuth = isAuthPage(pathname);

      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        if (isAuth) {
          router.replace("/");
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
        clearAuthData();
        if (!isAuth) {
          router.replace("/login");
        }
      }
    };

    checkAuth();
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
