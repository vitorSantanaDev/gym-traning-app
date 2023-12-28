import axios, { AxiosError, AxiosInstance } from "axios";
import { AppError } from "@utils/AppError";
import {
  getAuthTokenFromStorage,
  saveAuthTokenOnStorage,
} from "@storage/storage-auth-token";

type SignOut = () => void;

type ProccessType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
};

const api = axios.create({
  baseURL: "http://localhost:3333",
}) as APIInstanceProps;

let requestsQueue: ProccessType[] = [];
let isRefreshing: boolean = false;

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError?.response?.status === 401) {
        if (
          requestError.response.data.message === "token.expired" ||
          requestError.response.data.message === "token.invalid"
        ) {
          const { refresh_token } = await getAuthTokenFromStorage();

          if (!refresh_token) {
            signOut();
            return Promise.reject(requestError);
          }

          const originalRequestConfig = requestError.config;

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              requestsQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = {
                    Authorization: `Bearer ${token}`,
                  };

                  resolve(api(originalRequestConfig));
                },
                onFailure: (error: AxiosError) => {
                  reject(error);
                },
              });
            });
          }

          isRefreshing = true;

          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.post("/sessions/refresh-token", {
                refresh_token,
              });

              await saveAuthTokenOnStorage({
                token: data.token,
                refresh_token: data.refresh_token,
              });

              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data
                );
              }

              originalRequestConfig.headers = {
                Authorization: `Bearer ${data.token}`,
              };

              api.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${data.token}`;

              requestsQueue.forEach((request) => request.onSuccess(data.token));

              resolve(api(originalRequestConfig));
            } catch (error: any) {
              requestsQueue.forEach((request) => request.onFailure(error));
              signOut();
              reject(error);
            } finally {
              isRefreshing = false;
              requestsQueue = [];
            }
          });
        }
        signOut();
      }

      if (requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message));
      } else {
        return Promise.reject(requestError);
      }
    }
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};

export { api };
