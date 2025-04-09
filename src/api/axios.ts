import axios, { InternalAxiosRequestConfig } from "axios";
import store from "@/redux/store";
// import { clearAuthTokens, setAuthTokens } from "@/redux/slices/auth.slice";

const BASE_URL: string = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: `${BASE_URL}`,
});

// const publicRoutes = ["/"];

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const { auth } = store.getState();
  const token: string | null = auth.accessToken;

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     const { auth } = store.getState();
//     // Jika token habis, coba refresh token
//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       auth.refreshToken
//     ) {
//       originalRequest._retry = true;

//       try {
//         const { data: getRefreshToken } = await requestRefreshToken(auth.refreshToken);
//         const accessToken = getRefreshToken.accessToken;
//         const refreshToken = getRefreshToken.refreshToken || auth.refreshToken;
//         const role = getRefreshToken.role || auth.role;

//         // Perbarui Redux dengan token baru (gunakan await agar state ter-update sebelum request ulang)
//         store.dispatch(
//           setAuthTokens({
//             accessToken,
//             refreshToken,
//             role,
//           })
//         );

//         // Update header dengan token baru
//         originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

//         return instance(originalRequest);
//       } catch (refreshError) {
//         // store.dispatch(clearAuthTokens());
//         redirectIfNotPublic();
//         return Promise.reject(refreshError);
//       }
//     }

//     // Jika token tidak ada atau sudah dihapus
//     if (error.response?.status === 401) {
//       // store.dispatch(clearAuthTokens());
//       redirectIfNotPublic();
//     }

//     return Promise.reject(error);
//   }
// );

// // Fungsi untuk redirect hanya jika halaman bukan publicRoutes
// const redirectIfNotPublic = () => {
//   const currentPath = window.location.pathname;
//   if (!publicRoutes.includes(currentPath)) {
//     store.dispatch(clearAuthTokens());
//     window.location.href = "/";
//   }
// };

export default instance;
