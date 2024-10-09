import { apiToken, verifyRefreshToken } from "./apiService";

export const getItems = async (navigate) => {
    try {
        if (!verifyRefreshToken(navigate))
            return
        const response = await apiToken().get("roles");
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API getItems:", error);
        return error.response;
    }
};

export const searchItems = async (navigate, keySearch, page, size) => {
    try {

        if (page === undefined || size === undefined)
            return;
        if (!verifyRefreshToken(navigate))
            return
        const response = await apiToken().get("roles/search?keySearch=" + keySearch + "&page=" + page + "&size=" + size);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API searchItems:", error);
        return error.response;
    }
};

export const update = async (module, navigate) => {
    try {
        if (!verifyRefreshToken(navigate))
            return
        const response = await apiToken().put("roles/" + module.name, module);
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
        const response = await apiToken().post("roles", module);
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
        const response = await apiToken().delete("roles/" + id);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API remove:", error);
        return error.response.data;
    }
};