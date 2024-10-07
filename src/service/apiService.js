import axios from "axios";
import { jwtDecode } from 'jwt-decode';
const expTime = 15; // đơn vị phút ( thời gian còn lại để refresh token)

// URL gốc của API (có thể cấu hình theo ý bạn)
// const API_BASE_URL = "http://14.225.217.118:8080/demo1";
const API_BASE_URL = "http://localhost:8080/demo1";

// Cấu hình axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 giây timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiToken = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 giây timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// verify token
const introspect = async (tk) => {
  try {
    const module = { token: tk };
    const response = await api.post("auth/introspect", module);
    if (!response
      || !response.data
      || !response.data.result
      || !response.data.result.valid)
      return false;
    return true;
  } catch (error) {
    console.error("Lỗi khi gọi API introspect:", error);
    return false;
  }
};

// check thời gian xem token sắp hết hạn chưa
const isTokenExpiringSoon = (token) => {
  const decodedToken = jwtDecode(token);
  const expirationTime = decodedToken.exp * 1000; // Đổi sang mili giây
  const currentTime = Date.now();
  const timeLeft = expirationTime - currentTime;
  return timeLeft < expTime * 60 * 1000 && timeLeft > 0; // Còn ít hơn expTime phút , quá thời gian thì không được refreshToken
};

// refresh token
const refreshAccessToken = async (tk) => {
  try {
    const module = { token: tk };
    const response = await api.post("auth/refresh", module);
    if (response
      && response.data
      && response.data.result
      && response.data.result.authenticated)
      localStorage.setItem("authToken", response.data.result.token);
  } catch (error) {
    console.error("Lỗi khi gọi API refreshAccessToken:", error);
  }
};

// hàm verify and refresh token tổng hợp (Luôn được gọi khi call api) \
// true : phải thực hiện tiếp sau khi gọi hàm này 
// false : quay về trang đăng nhập và xóa token trong localStorage
export const verifyRefreshToken = async (navigate) => {
  const tk = localStorage.getItem("authToken");
  const tokenValid = await introspect(tk);
  if (!tokenValid) {
    localStorage.removeItem("authToken");
    navigate("/");
    return false;
  }
  if (isTokenExpiringSoon(tk)) {
    refreshAccessToken(tk); // Gọi API để lấy token mới
  }
  return true;
}
