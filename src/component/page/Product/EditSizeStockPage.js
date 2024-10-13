import React, { useState, useEffect, useRef } from 'react';
import { convertVnd } from '../../../tool/ToolAll';
import SelectCus from '../../element/SelectCus';
import IntBox from '../../element/IntBox';
import { getItems, update } from '../../../service/serviceSize';
import { useNavigate } from 'react-router-dom';

const EditSizeStockPage = ({ module, isOpen, onClose, onUpdate }) => {

    const [errors, setErrors] = useState({});
    const [sizes, setSizes] = useState([]);
    const navigate = useNavigate();

    const options = [
        {
            label: "Size L",
            value: "L",
            stock: "0"
        },
        {
            label: "Size M",
            value: "M",
            stock: "0"
        },
        {
            label: "Size S",
            value: "S",
            stock: "0"
        },
        {
            label: "Size XL",
            value: "XL",
            stock: "0"
        },
        {
            label: "Size XXL",
            value: "XXL",
            stock: "0"
        },
    ]

    const fetchModules = async (id) => {
        try {
            const data = await getItems(id, navigate);
            if (data && data.code === 1000 && data.result) {
                const valueObj = data.result.map(item =>
                ({
                    label: "Size " + item.id.name,
                    value: item.id.name,
                    stock: item.stock.toString()
                })
                );
                setSizes(valueObj);
            }
        } catch (error) {
            console.error('Error fetching modules:', error);
        }
    };

    useEffect(() => {
        if (module && module.id) {
            fetchModules(module.id);
        } else
            setSizes([]);
    }, [isOpen]);

    if (!isOpen) return null;

    const validateForm = () => {

        let formErrors = {};

        if (!sizes || sizes.length === 0) {
            formErrors.sizes = "Size là bắt buộc";
        }

        setErrors(formErrors);

        return Object.keys(formErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm() && module.id) {
            let reponse = await update(module.id, sizes, navigate);

            if (reponse && reponse.message)
                alert("Error: " + reponse.message);
            else {
                alert("Lưu thành công");
                onClose();
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
            <div className="bg-white p-6 rounded-md shadow-lg w-1/2">
                <h2 className="text-xl font-bold mb-4">Manage Size and stock</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex">
                        <div className='w-2/6'>
                            <div className='w-full'>
                                <SelectCus className='mb-2 mt-1' value={sizes || ''}
                                    error={errors.sizes} labelName="Size" isRequired isMulti onChange={(e) => {

                                        setSizes(e);
                                    }} options={options} placeholder="Select size"></SelectCus>
                                <div className='text-sm'>Id: {module.id || ''}</div>
                            </div>
                            <div className="flex">
                                <img className="w-2/6 h-32 object-scale-down" src={module.imageUrl || ''} alt="Product Image" />
                                <div className='w-4/6 p-6 text-start'>
                                    <div className='text-xl'>{module.name || ''}</div>
                                    <div className='text-gray-500'>{convertVnd(module.price || '')}</div>
                                    <div className='text-gray-500'>
                                        <span>{module.color ? module.color.value : ''}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-4/6'>
                            {sizes && sizes.map((item, index) => (
                                <div key={index} className='flex'>
                                    <div className='flex justify-center items-center w-1/2'>
                                        {item.label}
                                    </div>
                                    <div className='w-1/2'>
                                        <IntBox className='mb-2 mt-1' value={item.stock} labelName={item.label + " Stock"} isRequired onChange={(e) => {

                                            const valueObj = e.target.value.replace(/^0+/, '') || '0';
                                            const updatedOptions = sizes.map(option =>
                                                option.value === item.value
                                                    ? { ...option, stock: valueObj } // Thay đổi stock thành 1 nếu value là "L"
                                                    : option // Giữ nguyên các đối tượng khác
                                            );
                                            setSizes(updatedOptions);
                                        }}></IntBox>
                                    </div>
                                </div>
                            ))}
                        </div>
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

export default EditSizeStockPage;
