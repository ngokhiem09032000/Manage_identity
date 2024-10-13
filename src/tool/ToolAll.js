import { parseISO, format } from 'date-fns';
import { jwtDecode } from 'jwt-decode';

export const castDate = (dateString) => {
    if (!dateString)
        return "";
    const parsedDate = parseISO(dateString); // Phân tích chuỗi ngày
    const formattedDate = format(parsedDate, 'dd/MM/yyyy');
    return formattedDate;
}

export const mapModuleUser = (user) => {
    return { ...user, roles: user.roles ? user.roles.map(r => ({ value: r.name, label: r.description })) : [] }
}

export const mapModuleListUser = (data) => {
    // Kiểm tra nếu data là mảng, thì sử dụng map, nếu là object, chuyển thành mảng 1 phần tử
    const dataMap = Array.isArray(data)
        ? data.map(dt => mapModuleUser(dt)) // Nếu là mảng, dùng map
        : [mapModuleUser(data)]; // Nếu là object, chuyển thành mảng 1 phần tử

    return dataMap;
}

export const mapModuleRole = (role) => {
    return { ...role, permissions: role.permissions ? role.permissions.map(r => ({ value: r.name, label: r.description })) : [] }
}

export const mapModuleListRole = (data) => {
    // Kiểm tra nếu data là mảng, thì sử dụng map, nếu là object, chuyển thành mảng 1 phần tử
    const dataMap = Array.isArray(data)
        ? data.map(dt => mapModuleRole(dt)) // Nếu là mảng, dùng map
        : [mapModuleRole(data)]; // Nếu là object, chuyển thành mảng 1 phần tử

    return dataMap;
}

export const mapModuleSizeColor = (product) => {
    return {
        ...product, size: product.size ? { value: product.size, label: "Size " + product.size } : ""
        , color: product.color ? { value: product.color, label: product.color } : ""
    }
}

export const mapModuleListSizeColor = (data) => {
    // Kiểm tra nếu data là mảng, thì sử dụng map, nếu là object, chuyển thành mảng 1 phần tử
    const dataMap = Array.isArray(data)
        ? data.map(dt => mapModuleSizeColor(dt)) // Nếu là mảng, dùng map
        : [mapModuleSizeColor(data)]; // Nếu là object, chuyển thành mảng 1 phần tử

    return dataMap;
}

// ép từ module db name value để hiển thị
export const castModule = (module) => {
    if (Array.isArray(module) && module)
        return module.map(r => r.value).join(' - ');
    return module;
}

export const checkRole = () => {
    const tk = localStorage.getItem("authToken");
    if (tk === null)
        return false;
    const decodedToken = jwtDecode(tk);
    const roles = decodedToken.scope;
    if (roles.includes("ROLE_ADMIN"))
        return true;
    return false;
}

export function convertVnd(price) {
    const formattedNumber = price.toLocaleString('vi-VN') + ' đ';
    return formattedNumber;
}