import React, { useState, useEffect, useRef } from 'react';
import TextBox from '../../element/TextBox';
import SelectCus from '../../element/SelectCus';
import IntBox from '../../element/IntBox';
import ImageChoose from '../../element/ImageChoose';
import { API_BASE_URL } from '../../../service/apiService';
import TextBoxArea from '../../element/TextBoxArea';

const EditPage = ({ module, isOpen, onClose, onUpdate, titleName, navigate }) => {

    const [moduleUpdate, setModuleUpdate] = useState({ ...module });
    const [errors, setErrors] = useState({});
    // const sizes = [
    //     {
    //         label: "Size L",
    //         value: "L",
    //         stock: 0
    //     },
    //     {
    //         label: "Size M",
    //         value: "M",
    //         stock: 0
    //     },
    //     {
    //         label: "Size S",
    //         value: "S",
    //         stock: 0
    //     },
    //     {
    //         label: "Size XL",
    //         value: "XL",
    //         stock: 0
    //     },
    //     {
    //         label: "Size XXL",
    //         value: "XXL",
    //         stock: 0
    //     },
    // ]

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
    let fileImage2 = useRef();
    let fileImage3 = useRef();
    let urlImageBefore = useRef(); // đường dẫn ảnh đã được chọn từ trước
    let urlImageBefore2 = useRef();
    let urlImageBefore3 = useRef();

    useEffect(() => {
        if (module) {
            setModuleUpdate({ ...module });
            urlImageBefore.current = module.imageUrl;
            urlImageBefore2.current = module.imageUrl2;
            urlImageBefore3.current = module.imageUrl3;
        }
    }, [module]);

    if (!isOpen) return null;

    const validateForm = () => {
        let formErrors = {};

        if (!moduleUpdate.name) {
            formErrors.name = "Product Name là bắt buộc";
        }

        if (!moduleUpdate.description) {
            formErrors.description = "Description là bắt buộc";
        }

        if (!moduleUpdate.price) {
            formErrors.price = "Price là bắt buộc";
        }

        if (!moduleUpdate.color) {
            formErrors.color = "Color là bắt buộc";
        }

        setErrors(formErrors);

        return Object.keys(formErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            // phần lưu image
            const formData = new FormData();
            formData.append('image', fileImage.current);
            formData.append('image2', fileImage2.current);
            formData.append('image3', fileImage3.current);
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
                    onUpdate(moduleUpdate, titleName === 'Create' ? true : false, "", "", "", null, null, null);
                    fileImage.current = "";
                    fileImage2.current = "";
                    fileImage3.current = "";
                    setErrors({});
                    onClose();
                } else {
                    const data = await response.json();
                    const uploadedImageUrl = data.url; // Lưu trữ URL của hình ảnh đã tải lên
                    const uploadedImageUrl2 = data.url2; // Lưu trữ URL của hình ảnh đã tải lên
                    const uploadedImageUrl3 = data.url3; // Lưu trữ URL của hình ảnh đã tải lên
                    const uploadedImageUrlReplace = API_BASE_URL + "/upload/" + uploadedImageUrl.split('/').pop(); // Lưu trữ URL của hình ảnh đã tải lên
                    const uploadedImageUrlReplace2 = API_BASE_URL + "/upload/" + uploadedImageUrl2.split('/').pop(); // Lưu trữ URL của hình ảnh đã tải lên
                    const uploadedImageUrlReplace3 = API_BASE_URL + "/upload/" + uploadedImageUrl3.split('/').pop(); // Lưu trữ URL của hình ảnh đã tải lên
                    // Sau khi tải hình ảnh thành công, gọi hàm cập nhật
                    onUpdate(moduleUpdate, titleName === 'Create' ? true : false, uploadedImageUrlReplace, uploadedImageUrlReplace2, uploadedImageUrlReplace3, urlImageBefore.current, urlImageBefore2.current, urlImageBefore3.current);
                    fileImage.current = "";
                    fileImage2.current = "";
                    fileImage3.current = "";
                    setErrors({});
                    onClose();
                }

            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
            <div className="bg-white p-6 rounded-md shadow-lg w-3/4">
                <h2 className="text-xl font-bold mb-4">{titleName} Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 grid grid-cols-2">
                        <div className='mr-1'>
                            <TextBox className='mb-2 mt-1' disabled={titleName === 'Create' ? false : true} value={moduleUpdate.name || ''}
                                error={errors.name} labelName="Product Name" isRequired onChange={(e) => {
                                    setModuleUpdate({ ...moduleUpdate, name: e.target.value })
                                }}></TextBox>

                            <IntBox className='mb-2 mt-1' value={moduleUpdate.price || ''}
                                error={errors.price} labelName="Price" isRequired onChange={(e) => {
                                    setModuleUpdate({ ...moduleUpdate, price: e.target.value })
                                }}></IntBox>

                            <SelectCus className='mb-2 mt-1' value={moduleUpdate.color || ''}
                                error={errors.color} isRequired labelName="Color" onChange={(e) => {
                                    setModuleUpdate({ ...moduleUpdate, color: e })
                                }} options={colors} placeholder="Select color"></SelectCus>
                        </div>
                        <div className='ml-1'>
                            <TextBoxArea className='mb-2 mt-1' value={moduleUpdate.description || ''} rows={5}
                                error={errors.description} labelName="Description" isRequired onChange={(e) => {
                                    setModuleUpdate({ ...moduleUpdate, description: e.target.value })
                                }}></TextBoxArea>
                        </div>
                    </div>
                    <div className='flex mb-4 space-x-2'>
                        <ImageChoose className='w-2/6 mb-2 mt-1' labelName="ImageUrl" input={moduleUpdate.imageUrl} image={moduleUpdate.imageUrl} onChange={(e) => {

                            if (e.target && e.target.files.length > 0) {
                                fileImage.current = e.target.files[0];
                                setModuleUpdate({ ...moduleUpdate, imageUrl: URL.createObjectURL(e.target.files[0]) })
                            } else if (e[0]) {
                                fileImage.current = e[0];
                                setModuleUpdate({ ...moduleUpdate, imageUrl: URL.createObjectURL(e[0]) })
                            }
                            // setModuleUpdate({ ...moduleUpdate, imageUrl: e.target.value || '', imageUrl2: e.target.value || '', imageUrl3: e.target.value || '' })
                        }}></ImageChoose>
                        <ImageChoose className='w-2/6 mb-2 mt-1' labelName="ImageUrl2" input={moduleUpdate.imageUrl2} image={moduleUpdate.imageUrl2} onChange={(e) => {

                            if (e.target && e.target.files.length > 0) {
                                fileImage2.current = e.target.files[0];
                                setModuleUpdate({ ...moduleUpdate, imageUrl2: URL.createObjectURL(e.target.files[0]) })
                            } else if (e[0]) {
                                fileImage2.current = e[0];
                                setModuleUpdate({ ...moduleUpdate, imageUrl2: URL.createObjectURL(e[0]) })
                            }
                            // setModuleUpdate({ ...moduleUpdate, imageUrl: e.target.value || '', imageUrl2: e.target.value || '', imageUrl3: e.target.value || '' })
                        }}></ImageChoose>
                        <ImageChoose className='w-2/6 mb-2 mt-1' labelName="ImageUrl3" input={moduleUpdate.imageUrl3} image={moduleUpdate.imageUrl3} onChange={(e) => {

                            if (e.target && e.target.files.length > 0) {
                                fileImage3.current = e.target.files[0];
                                setModuleUpdate({ ...moduleUpdate, imageUrl3: URL.createObjectURL(e.target.files[0]) })
                            } else if (e[0]) {
                                fileImage3.current = e[0];
                                setModuleUpdate({ ...moduleUpdate, imageUrl3: URL.createObjectURL(e[0]) })
                            }
                            // setModuleUpdate({ ...moduleUpdate, imageUrl: e.target.value || '', imageUrl2: e.target.value || '', imageUrl3: e.target.value || '' })
                        }}></ImageChoose>
                    </div>
                    <div className="flex justify-end space-x-2 mt-10">
                        <button
                            type="button"
                            className="bg-button text-white px-4 py-2 rounded hover:bg-accent"
                            onClick={() => {
                                fileImage.current = "";
                                fileImage2.current = "";
                                fileImage3.current = "";
                                setErrors({});
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
