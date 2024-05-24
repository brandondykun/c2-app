import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import { Profile, User } from "../../types/types";
import { getMyInfo, refreshToken } from "../../api/auth";

type AuthContextType = {
  userInfo: User;
  profile: Profile;
  authenticate: (user: User, profile: Profile) => void;
  isAuthenticated: boolean;
  authLoading: boolean;
  logOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  userInfo: { id: null, email: null },
  profile: {
    id: null,
    username: null,
    about: null,
    user: null,
  },
  authenticate: (data: User, profile: Profile) => {},
  isAuthenticated: false,
  authLoading: true,
  logOut: () => Promise.resolve(),
});

type Props = {
  children: React.ReactNode;
};

function AuthContextProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<User>({ id: null, email: null });
  const [profile, setProfile] = useState<Profile>({
    id: null,
    username: null,
    about: null,
    user: null,
  });

  useEffect(() => {
    // check for stored refresh token on app load - if token present
    // use token to automatically log the user in
    const persistLogin = async () => {
      const storedRefreshToken = await SecureStore.getItemAsync(
        "REFRESH_TOKEN"
      );

      if (storedRefreshToken) {
        const { error, data } = await refreshToken(storedRefreshToken);
        if (data && !error) {
          await SecureStore.setItemAsync("ACCESS_TOKEN", data.access);
          const { data: myInfoData, error: myInfoError } = await getMyInfo();

          if (myInfoData && !myInfoError) {
            const userData = { id: myInfoData.id, email: myInfoData.email };
            authenticate(userData, myInfoData.profile);
          }
        } else {
          logOut();
        }
      }
      setAuthLoading(false);
    };
    persistLogin();
  }, []);

  const authenticate = (user: User, profile: Profile) => {
    setUserInfo(user);
    setProfile(profile);
    setIsAuthenticated(true);
  };

  const logOut = async () => {
    setUserInfo({ id: null, email: null });
    setProfile({ id: null, username: null, about: null, user: null });
    setIsAuthenticated(false);
    await SecureStore.deleteItemAsync("REFRESH_TOKEN");
    await SecureStore.deleteItemAsync("ACCESS_TOKEN");
  };

  const value = {
    userInfo,
    profile,
    authenticate,
    isAuthenticated,
    authLoading,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

export const useAuthContext = () => {
  const {
    userInfo,
    authenticate,
    isAuthenticated,
    authLoading,
    logOut,
    profile,
  } = useContext(AuthContext);
  return {
    userInfo,
    authenticate,
    isAuthenticated,
    authLoading,
    logOut,
    profile,
  };
};
