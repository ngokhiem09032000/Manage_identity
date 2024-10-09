import React, { useState, useEffect, useRef } from 'react';
import TextBox from '../../element/TextBox';
import SelectCus from '../../element/SelectCus';
import IntBox from '../../element/IntBox';
import ImageChoose from '../../element/ImageChoose';
import { API_BASE_URL } from '../../../service/apiService';

const EditPage = ({ module, isOpen, onClose, onUpdate, titleName, navigate }) => {

    const [moduleUpdate, setModuleUpdate] = useState({ ...module });
    const sizes = [
        {
            label: "Size L",
            value: "L"
        },
        {
            label: "Size M",
            value: "M"
        },
        {
            label: "Size S",
            value: "S"
        },
        {
            label: "Size XL",
            value: "XL"
        },
        {
            label: "Size XXL",
            value: "XXL"
        },
    ]

    const colors = [
        {
            label: "Red",
            value: "Red"
        },
        {
            label: "Yellow",
            value: "Yellow"
        },
        {
            label: "Blue",
            value: "Blue"
        },
        {
            label: "Black",
            value: "Black"
        },
        {
            label: "White",
            value: "White"
        },
    ]

    // const [image, setImage] = useState(null);
    let fileImage = useRef();

    useEffect(() => {
        if (module) {
            setModuleUpdate({ ...module });
        }
    }, [module]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // phần lưu image
        const formData = new FormData();
        formData.append('image', fileImage.current);
        const token = localStorage.getItem("authToken");

        try {
            const response = await fetch(`${API_BASE_URL}/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    // Không cần thiết lập Content-Type ở đây
                },
                body: formData,
            });

            // Kiểm tra xem phản hồi có thành công không
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const uploadedImageUrl = data.url; // Lưu trữ URL của hình ảnh đã tải lên
            const uploadedImageUrlReplace = uploadedImageUrl.replace("/uploads/", "/demo1/upload/"); // Lưu trữ URL của hình ảnh đã tải lên
            // Sau khi tải hình ảnh thành công, gọi hàm cập nhật
            onUpdate(moduleUpdate, titleName === 'Create' ? true : false, uploadedImageUrlReplace);
            onClose();

        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
            <div className="bg-white p-6 rounded-md shadow-lg w-1/2">
                <h2 className="text-xl font-bold mb-4">{titleName} Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 grid grid-cols-2">
                        <TextBox className='mr-1 mb-2 mt-1' disabled={titleName === 'Create' ? false : true} value={moduleUpdate.name || ''} labelName="Product Name" onChange={(e) => {
                            setModuleUpdate({ ...moduleUpdate, name: e.target.value })
                        }}></TextBox>
                        <TextBox className='ml-1 mb-2 mt-1' value={moduleUpdate.description || ''} labelName="Description" onChange={(e) => {
                            setModuleUpdate({ ...moduleUpdate, description: e.target.value })
                        }}></TextBox>
                        <SelectCus className='mr-1 mb-2 mt-1' value={moduleUpdate.size || ''} labelName="Size" onChange={(e) => {
                            setModuleUpdate({ ...moduleUpdate, size: e })
                        }} options={sizes} placeholder="Select size"></SelectCus>
                        <SelectCus className='ml-1 mb-2 mt-1' value={moduleUpdate.color || ''} labelName="Color" onChange={(e) => {
                            setModuleUpdate({ ...moduleUpdate, color: e })
                        }} options={colors} placeholder="Select color"></SelectCus>
                        <IntBox className='mr-1 mb-2 mt-1' value={moduleUpdate.price || ''} labelName="Price" onChange={(e) => {
                            setModuleUpdate({ ...moduleUpdate, price: e.target.value })
                        }}></IntBox>
                        <IntBox className='ml-1 mb-2 mt-1' value={moduleUpdate.stock || ''} labelName="Stock" onChange={(e) => {
                            setModuleUpdate({ ...moduleUpdate, stock: e.target.value })
                        }}></IntBox>
                        <ImageChoose className='mr-1 mb-2 mt-1' labelName="ImageUrl" input={moduleUpdate.imageUrl} image={moduleUpdate.imageUrl} onChange={(e) => {
                            debugger;
                            if (e.target && e.target.files.length > 0) {
                                fileImage.current = e.target.files[0];
                                setModuleUpdate({ ...moduleUpdate, imageUrl: URL.createObjectURL(e.target.files[0]) })
                            } else if (e[0]) {
                                fileImage.current = e[0];
                                setModuleUpdate({ ...moduleUpdate, imageUrl: URL.createObjectURL(e[0]) })
                            }
                            // setModuleUpdate({ ...moduleUpdate, imageUrl: e.target.value || '', imageUrl2: e.target.value || '', imageUrl3: e.target.value || '' })
                        }}></ImageChoose>
                    </div>
                    <div className="flex justify-end space-x-2 mt-10">
                        <button
                            type="button"
                            className="bg-button text-white px-4 py-2 rounded hover:bg-accent"
                            onClick={() => {
                                onClose();
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-button text-white px-4 py-2 rounded hover:bg-accent"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPage;
