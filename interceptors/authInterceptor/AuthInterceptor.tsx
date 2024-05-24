import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { axiosInstance } from "../../api/config";
import { useAuthContext } from "../../context/authContext/AuthContext";
import { getMyInfo, refreshToken } from "../../api/auth";

type Props = {
  children: React.ReactNode;
};

const AuthInterceptor = ({ children }: Props) => {
  const { isAuthenticated, logOut, userInfo, authenticate } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      // Add a response interceptor
      const authInterceptor = axiosInstance.interceptors.response.use(
        function (response) {
          // Any status code that lie within the range of 2xx cause this function to trigger
          // Do something with response data
          return response;
        },
        async function (error) {
          const config = error?.config;
          // Any status codes that falls outside the range of 2xx cause this function to trigger
          // Do something with response error
          if (error.response.status === 401 && !config._retry) {
            config._retry = true;
            // access token is expired
            // try to refresh the token
            const storedRefreshToken = await SecureStore.getItemAsync(
              "REFRESH_TOKEN"
            );
            if (storedRefreshToken) {
              const { error, data } = await refreshToken(storedRefreshToken);
              if (data && !error) {
                // await SecureStore.setItemAsync("ACCESS_TOKEN", data.access);
                // authenticate(userInfo, data.access);
                config.headers.Authorization = `Bearer ${data.access}`;
              } else {
                logOut();
              }
            }
            return axiosInstance(config);
          }

          return Promise.reject(error);
        }
      );

      return () => {
        axiosInstance.interceptors.request.eject(authInterceptor);
      };
    }
  }, [isAuthenticated, logOut]);

  return children;
};

export default AuthInterceptor;
