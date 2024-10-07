import { api } from "./apiService";

// Hàm get token
export const token = async (account) => {
  try {
    const response = await api.post("auth/token", account);
    return response.data;
  } catch (error) {
    console.error("Đăng nhập thất bại", error);
    return error.response;
  }
};
