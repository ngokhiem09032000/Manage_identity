import React, { useEffect, useRef, useState } from 'react';
import { fetchImage } from '../../service/apiService';

const ImageChoose = ({ onChange, labelName, className, disabled, image }) => {

    // const fileInputRef = useRef(null);

    const loadImage = async () => {
        // if (input && !input.includes('blob:')) {
        //     
        //     // Nếu file là một URL, tải nó về dưới dạng Blob
        //     // const blob = await fetchImage(input);
        //     // const fileObject = new File([blob], 'image.jpg', { type: blob.type });

        //     const response = await fetch(input);
        //     if (response.ok) {
        //         // Đọc dữ liệu hình ảnh dưới dạng blob
        //         const blob = await response.blob();

        //         const fileName = input.split('/').pop();
        //         // Tạo đối tượng File từ blob
        //         const fileObject = new File([blob], fileName, { type: blob.type });

        //         if (fileInputRef.current) {
        //             // Gán File vào input
        //             const dataTransfer = new DataTransfer();
        //             dataTransfer.items.add(fileObject);
        //             fileInputRef.current.files = dataTransfer.files;
        //             onChange(dataTransfer.files);
        //         }
        //     }
        // }
    };

    // Dùng useEffect để gọi loadImage khi item.imageUrl thay đổi
    useEffect(() => {
        loadImage();
    }, [image]);

    return (
        <div className={className}>
            <div className="w-full border border-gray-300 rounded-md">
                <div className='grid grid-cols-2 p-2'>
                    <div className='flex justify-center items-center'>
                        <label htmlFor={labelName} className="cursor-pointer peer bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none  hover:border-slate-300 shadow-sm focus:shadow focus:ring-1 focus:ring-blue-500">
                            Chọn ảnh
                        </label>
                        <input id={labelName} onChange={onChange} disabled={disabled} type='file' alt="Uploaded" accept="image/png, image/jpeg, image/jpg, image/gif"
                            className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none  hover:border-slate-300 shadow-sm focus:shadow focus:ring-1 focus:ring-blue-500 hidden"
                        />
                    </div>
                    <div className='flex justify-center items-center'>
                        {image && <img className="w-40 h-40" src={image} ></img>}
                    </div>


                </div>
            </div>
        </div>
    );
};

export default ImageChoose;