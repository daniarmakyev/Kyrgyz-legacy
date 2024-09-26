import axios from "axios";
import { useAppDispatch } from "./types";
import { useRouter } from "next/navigation";
import { logout } from "../store/Users/Users.slice";

// Создание экземпляра Axios
export const $axios = axios.create({
  baseURL: "http://localhost:8080/api",
});

function HandleLogout() {
  console.log("Logging out due to token expiration");

  const dispatch = useAppDispatch();
  const navigate = useRouter();
  dispatch(logout());
  navigate.push('/auth');
}

$axios.interceptors.request.use((config) => {
  const tokens = JSON.parse(localStorage.getItem("tokens") as string);
  if (tokens && tokens.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
});


$axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const tokens = JSON.parse(localStorage.getItem("tokens") as string);

      if (tokens && tokens.refreshToken) {
        try {
          const { data } = await $axios.post("/users/token/refresh", {
            refreshToken: tokens.refreshToken,
          });
          localStorage.setItem(
            "tokens",
            JSON.stringify({ ...tokens, accessToken: data.accessToken })
          );
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return $axios(originalRequest);
        } catch (error) {
          console.log("Token refresh failed", error);
          HandleLogout();
        }
      }
    }

    return Promise.reject(error);
  }
);