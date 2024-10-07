import { apiToken, verifyRefreshToken } from "./apiService";

apiToken.interceptors.request.use(
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

export const getItems = async (navigate, keySearch, page, size) => {
    try {
        debugger;
        if (page === undefined || size === undefined)
            return;
        if (!verifyRefreshToken(navigate))
            return
        const response = await apiToken.get("users/search?keySearch=" + keySearch + "&page=" + page + "&size=" + size);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API getItems:", error);
        return error.response;
    }
};

export const update = async (module, navigate) => {
    try {
        if (!verifyRefreshToken(navigate))
            return
        const response = await apiToken.put("users/" + module.id, module);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API update:", error);
        return error.response;
    }
};

export const create = async (module, navigate) => {
    try {
        if (!verifyRefreshToken(navigate))
            return
        const response = await apiToken.post("users", module);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API create:", error);
        return error.response.data;
    }
};

export const remove = async (id, navigate) => {
    try {
        if (!verifyRefreshToken(navigate))
            return
        const response = await apiToken.delete("users/" + id);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API remove:", error);
        return error.response.data;
    }
};

export const getKeys = async (endpoint, navigate) => {
    try {
        if (!verifyRefreshToken(navigate))
            return
        const response = await apiToken.get(endpoint + "/keys");
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API getKeys:", error);
        return error.response;
    }
};
