import axios from "axios";
import { jwtDecode } from 'jwt-decode';
const expTime = 15; // đơn vị phút ( thời gian còn lại để refresh token)

// URL gốc của API (có thể cấu hình theo ý bạn)
// const API_BASE_URL = "http://14.225.217.118:8080/demo1";
export const API_BASE_URL = "http://localhost:8080/demo1";

// Cấu hình axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 giây timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// export const apiToken = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 10000, // 10 giây timeout
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

export const apiToken = () => {
  const apiTk = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 giây timeout
    headers: {
      "Content-Type": "application/json",
    },
  });
  apiTk.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return apiTk;
}

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

export const fetchImage = async (url) => {

  const fileName = url.split('/').pop();
  const token = localStorage.getItem("authToken"); // Nếu cần token
  try {
    const response = await fetch(`${API_BASE_URL}/upload/${fileName}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Nếu cần thiết
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob(); // Chuyển đổi phản hồi thành blob
    return blob; // Hoặc cách khác tùy thuộc vào cách bạn xử lý hình ảnh
  } catch (error) {
    console.error('Error fetching image:', error);
  }
};

export const deleteFile = async (fileName) => {
  const token = localStorage.getItem("authToken");

  try {
    const response = await fetch(`${API_BASE_URL}/upload/${fileName}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    // Kiểm tra xem phản hồi có thành công không
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('File deleted successfully:', data);

  } catch (error) {
    console.error('Error deleting file:', error);
  }
};
