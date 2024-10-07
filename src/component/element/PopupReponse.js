import React, { useEffect, useState } from "react";

function PopupReponse({ type, message, onClose, closeButton }) {
  const [isVisible, setIsVisible] = useState(true);

  // Hàm xác định class dựa trên loại thông báo
  const getTypeClass = (type) => {
    switch (type) {
      case "error":
        return "bg-red-100 text-red-700 border-red-400";
      case "warning":
        return "bg-yellow-100 text-yellow-700 border-yellow-400";
      case "success":
        return "bg-green-100 text-green-700 border-green-400";
      case "info":
        return "bg-blue-100 text-blue-700 border-blue-400";
      default:
        return "";
    }
  };

  // Tự động tắt sau 5 giây nếu không có nút đóng và hiệu ứng mờ dần
  useEffect(() => {
    if (!closeButton) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 1000); // Thời gian trễ để thực hiện hiệu ứng mờ dần
      }, 500);

      return () => clearTimeout(timer); // Cleanup timer khi unmount
    }
  }, [closeButton, onClose]);

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 border-l-4 p-4 rounded-md shadow-lg transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"
        } ${getTypeClass(type)}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium">{message}</span>
        {closeButton && (
          <button
            className="ml-4 text-xl font-semibold text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={onClose}
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
}

export default PopupReponse;
