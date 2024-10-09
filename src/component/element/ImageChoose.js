import React, { useEffect, useRef, useState } from 'react';
import { fetchImage } from '../../service/apiService';

const ImageChoose = ({ onChange, labelName, className, disabled, input, image }) => {

    const fileInputRef = useRef(null);

    const loadImage = async () => {
        if (input && !input.includes('blob:')) {
            debugger;
            // Nếu file là một URL, tải nó về dưới dạng Blob
            // const blob = await fetchImage(input);
            // const fileObject = new File([blob], 'image.jpg', { type: blob.type });

            const response = await fetch(input);
            if (response.ok) {
                // Đọc dữ liệu hình ảnh dưới dạng blob
                const blob = await response.blob();

                const fileName = input.split('/').pop();
                // Tạo đối tượng File từ blob
                const fileObject = new File([blob], fileName, { type: blob.type });

                if (fileInputRef.current) {
                    // Gán File vào input
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(fileObject);
                    fileInputRef.current.files = dataTransfer.files;
                    onChange(dataTransfer.files);
                }
            }
        }
    };

    // Dùng useEffect để gọi loadImage khi item.imageUrl thay đổi
    useEffect(() => {
        loadImage();
    }, [input]);

    return (
        <div className={className}>
            <div className="w-full">
                <div className="relative">
                    <input onChange={onChange} disabled={disabled} type='file' alt="Uploaded" ref={fileInputRef}
                        className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none  hover:border-slate-300 shadow-sm focus:shadow focus:ring-1 focus:ring-blue-500"
                    />
                    <label className="absolute cursor-text bg-white px-1 transition-all transform origin-left -top-2 left-2.5 text-xs text-slate-400 scale-90">
                        {labelName}
                    </label>
                    {image && <img className="w-40 h-40 mt-3" src={image} ></img>}
                </div>
            </div>
        </div>
    );
};

export default ImageChoose;