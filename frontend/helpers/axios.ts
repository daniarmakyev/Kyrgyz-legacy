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
  // Получение токенов из localStorage
  const tokens = JSON.parse(localStorage.getItem("tokens") as string);
  if (tokens) {
    // Добавление токена авторизации в заголовок запроса
    config.headers.Authorization = `Bearer ${tokens.access}`;
  }
  return config;
});


$axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Проверка статуса ошибки (403) и отсутствия флага _retry
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const tokens = JSON.parse(localStorage.getItem("tokens") as string);
      if (tokens) {
        try {
          // Обновляем токен через запрос к API
          const { data } = await $axios.post("/token/refresh", {
            refresh: tokens.refresh, // Передаем refresh-токен
          });

          // Сохраняем новый access-токен в localStorage
          localStorage.setItem(
            "tokens",
            JSON.stringify({ ...tokens, access: data.access })
          );

          // Повторяем оригинальный запрос с новым токеном
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
