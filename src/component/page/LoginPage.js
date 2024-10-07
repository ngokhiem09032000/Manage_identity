import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { token } from "../../service/serviceLogin";
import Logo from "../element/Logo";
import PopupReponse from "../element/PopupReponse";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Hook để điều hướng
    const [popup, setPopup] = useState({ isOpen: false, message: "", type: "" });

    // Hàm xử lý khi input thay đổi
    const handleInputChange = (event) => {
        setUsername(event.target.value); // Cập nhật state với giá trị mới
    };

    // Hàm xử lý khi input password thay đổi
    const handlePasswordChange = (event) => {
        setPassword(event.target.value); // Cập nhật state password
    };

    const handleClosePopup = () => {
        setPopup({ ...popup, isOpen: false });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const acount = {
            userName: username,
            passWord: password,
        };

        if (!username || !password) {
            setPopup({
                isOpen: true,
                message: "Login failed!",
                type: "error",
                closeButton: false,
            });
            return;
        }

        const data = await token(acount);

        if (data && data.code === 1000 && data.result.authenticated === true) {
            setPopup({
                isOpen: true,
                message: "Login successful!",
                type: "success",
                closeButton: false,
            });

            localStorage.setItem("authToken", data.result.token);
            navigate("/Home");
        } else {
            setPopup({
                isOpen: true,
                message: "Login failed!",
                type: "error",
                closeButton: false,
            });
            localStorage.removeItem("authToken");
        }
    };
    return (
        <div className="w-full min-h-screen flex">
            {/* Nửa bên trái có background */}
            <div className="hidden md:flex w-1/2  h-screen bg-primary items-center justify-center">
                <div className="text-center">
                    <Logo name="devchicken"></Logo>
                </div>
            </div>

            {/* Nửa bên phải không có background */}
            <div className="w-full md:w-1/2 h-screen flex items-center justify-center bg-secondary">
                <div className="md:hidden max-sm:hidden absolute top-10">
                    <Logo name="devchicken"></Logo>
                </div>
                <div className="w-96 p-8 bg-background shadow-lg rounded-lg">
                    <h2 className="text-2xl font-semibold text-center mb-6 text-primary">
                        Login
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-text mb-2 float-start">Username</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-border rounded"
                                placeholder="Enter your username"
                                value={username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-text mb-2 float-start">Password</label>
                            <input
                                type="password"
                                className="w-full p-2 border border-border rounded"
                                placeholder="Enter your password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-button text-text font-semibold rounded hover:bg-accent"
                        >
                            Login
                        </button>
                    </form>
                    {popup.isOpen && (
                        <PopupReponse
                            type={popup.type}
                            message={popup.message}
                            onClose={handleClosePopup}
                            closeButton={popup.closeButton} // Quyết định có nút đóng hay không
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
