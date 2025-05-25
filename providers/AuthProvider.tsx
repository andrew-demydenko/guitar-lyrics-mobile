import { useRouter, usePathname } from "expo-router";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Platform } from "react-native";
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
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthProvider = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthProvider must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const signOut = () => {
    setUser(null);
    clearAuthData();
    router.replace("/login");
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (Platform.OS === "ios") {
        setUser({ name: "test", email: "huxley1991@gmail.com", id: "1" });
        return;
      }
      const isAuth = isAuthPage(pathname);

      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        if (isAuth) {
          router.replace("/");
        }
      } catch (e) {
        console.info("Failed to fetch user data", e);
        clearAuthData();
        if (!isAuth) {
          router.replace("/login");
        }
      }
    };

    checkAuth();
  }, [router, pathname]);

  return (
    <AuthContext.Provider value={{ user, setUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
