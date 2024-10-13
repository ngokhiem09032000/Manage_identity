import { apiToken, verifyRefreshToken } from "./apiService";

export const getItems = async (id, navigate) => {
    try {
        if (!verifyRefreshToken(navigate))
            return
        const response = await apiToken().get("sizes/" + id);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API getItems:", error);
        return error.response;
    }
};

export const update = async (id, module, navigate) => {
    try {
        if (!verifyRefreshToken(navigate))
            return
        const response = await apiToken().put("sizes/" + id, module);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API update:", error);
        return error.response;
    }
};