import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { create, searchItems, remove, update } from '../../../service/serviceProduct';
import { MdDelete, MdEdit } from 'react-icons/md';
import EditPage from './EditPage';
import PopupReponse from '../../element/PopupReponse';
import { IoMdAddCircle } from 'react-icons/io';
import Paginate from '../../element/Paginate';
import SearchBox from '../../element/SearchBox';
import { convertVnd, mapModuleListSizeColor } from '../../../tool/ToolAll';
import { deleteFile } from '../../../service/apiService';
import { FaWarehouse } from 'react-icons/fa';
import EditSizeStockPage from './EditSizeStockPage';

const ProductPage = () => {

    const [modules, setModules] = useState([]);
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupOpenSAS, setIsPopupOpenSAS] = useState(false); // is open page size and stock
    const [titleName, setTitleName] = useState("");
    const [popup, setPopup] = useState({ isOpen: false, message: "", type: "" });
    const [selectedModule, setSelectedModule] = useState(null);
    const [selectedModuleSAS, setSelectedModuleSAS] = useState(null);
    const createModuleData = {
        id: '',
        name: '',
        description: '',
        size: '',
        color: '',
        price: '',
        stock: '',
        imageUrl: '',
        imageUrlView: ''
    }

    // phần paginate
    const [keySearch, setKeySearch] = useState("");
    const [selectedPage, setSelectedPage] = useState(0);
    const itemsPerPage = 4; // Hiển thị 3 người trên mỗi trang
    // const totalPages = Math.ceil(modules.length / itemsPerPage);
    let totalPages = useRef(0);

    // Hàm xử lý khi thay đổi trang
    const handlePageChange = ({ selected }) => {
        fetchModules(keySearch, selected);
    };
    // phần paginate

    const fetchModules = async (keySearch, page) => {
        try {
            const data = await searchItems(navigate, keySearch, page, itemsPerPage);
            console.log(data);
            if (data && data.code === 1000 && data.result && data.result.content) {
                totalPages.current = data.result.totalPages;

                const transformedData = mapModuleListSizeColor(data.result.content);
                setModules(transformedData);
            }
            setSelectedPage(page);
        } catch (error) {
            console.error('Error fetching modules:', error);
        }
    };

    useEffect(() => {
        fetchModules(keySearch, 0);
    }, []);

    const handleUpdate = (module) => {
        setSelectedModule(module);  // Chọn người dùng cần sửa
        setIsPopupOpen(true);
        setTitleName("Update");
    };

    const handleAdd = () => {

        setSelectedModule(createModuleData);
        setIsPopupOpen(true);
        setTitleName("Create");
    };

    const handleModuleUpdate = async (updatedModule, isCreate, uploadedImageUrl, urlImageBefore) => {
        let reponse = "";
        const updatedModuleCast = {
            ...updatedModule
            // , size: updatedModule.size ? updatedModule.size.value : "S"
            , color: updatedModule.color ? updatedModule.color.value : "None"
            , imageUrl: uploadedImageUrl === "" ? updatedModule.imageUrl : uploadedImageUrl
            , imageUrl2: uploadedImageUrl === "" ? updatedModule.imageUrl : uploadedImageUrl
            , imageUrl3: uploadedImageUrl === "" ? updatedModule.imageUrl : uploadedImageUrl
        };
        if (!isCreate) {
            reponse = await update(updatedModuleCast, navigate);
        } else {
            reponse = await create(updatedModuleCast, navigate);
        }
        setPopup({
            isOpen: true,
            message: reponse.message ? reponse.message : "Success!",
            type: reponse.message ? "error" : "success",
            closeButton: false,
        });

        if (reponse && reponse.code && reponse.code === 1000 && urlImageBefore) {
            const imageRemove = urlImageBefore.split('/').pop();
            deleteFile(imageRemove);
        }
        setKeySearch("");
        fetchModules("", 0);
    };

    const handleDelete = async (id, url) => {
        // Xử lý xóa người dùng
        const reponse = await remove(id, navigate);
        setPopup({
            isOpen: true,
            message: reponse.message ? reponse.message : "Success!",
            type: reponse.message ? "error" : "success",
            closeButton: false,
        });
        if (reponse && reponse.code && reponse.code === 1000) {
            const imageRemove = url.split('/').pop();
            deleteFile(imageRemove);
        }
        setKeySearch("");
        fetchModules("", 0);
    };

    const handleClosePopup = () => {
        setPopup({ ...popup, isOpen: false });
    };

    const handleUpdateSAS = (module) => {
        setSelectedModuleSAS(module);  // Chọn người dùng cần sửa
        setIsPopupOpenSAS(true);
    };

    const handleModuleUpdateSAS = async (updatedModule, isCreate, uploadedImageUrl, urlImageBefore) => {
        // let reponse = "";
        // const updatedModuleCast = {
        //     ...updatedModule
        //     // , size: updatedModule.size ? updatedModule.size.value : "S"
        //     , color: updatedModule.color ? updatedModule.color.value : "None"
        //     , imageUrl: uploadedImageUrl === "" ? updatedModule.imageUrl : uploadedImageUrl
        //     , imageUrl2: uploadedImageUrl === "" ? updatedModule.imageUrl : uploadedImageUrl
        //     , imageUrl3: uploadedImageUrl === "" ? updatedModule.imageUrl : uploadedImageUrl
        // };
        // if (!isCreate) {
        //     reponse = await update(updatedModuleCast, navigate);
        // } else {
        //     reponse = await create(updatedModuleCast, navigate);
        // }
        // setPopup({
        //     isOpen: true,
        //     message: reponse.message ? reponse.message : "Success!",
        //     type: reponse.message ? "error" : "success",
        //     closeButton: false,
        // });
        // 
        // if (reponse && reponse.code && reponse.code === 1000 && urlImageBefore) {
        //     const imageRemove = urlImageBefore.split('/').pop();
        //     deleteFile(imageRemove);
        // }
        // setKeySearch("");
        // fetchModules("", 0);
    };

    return (
        <div className='pl-20 pr-2 h-screen bg-gray-100 pt-5'>
            <div className='text-2xl text-text bg-secondary rounded pl-3 h-16 columns-2'>
                <h1 className='text-left font-bold' style={{ lineHeight: '4rem' }}>Manage Product</h1>
                <div className="flex justify-center items-center h-12 mt-2 mr-2 float-end bg-green-500 rounded p-2 hover:bg-green-800" onClick={() => handleAdd()}>
                    <IoMdAddCircle size={24} className="text-white" />
                    <span className='text-base text-white'>Create Product</span>
                </div>
                <div className="flex justify-center items-center h-12 mt-2 mr-2 float-end p-2 ">
                    <SearchBox className='border border-text rounded-md' labelName="Search" value={keySearch || ''} onChange={(e) => {
                        fetchModules(e.target.value, 0);
                        setKeySearch(e.target.value);
                    }}></SearchBox>
                </div>
            </div>


            <div className="overflow-auto rounded-lg shadow hidden md:block">
                <table className="w-full text-left">
                    <thead className='bg-gray-50 border-b-2 border-gray-200'>
                        <tr>
                            <th className='w-24 p-3 text-sm font-semibold tracking-wide'>No.</th>
                            <th className='w-24 p-3 text-sm font-semibold tracking-wide'>Product name</th>
                            <th className='w-24 p-3 text-sm font-semibold'>Description</th>
                            <th className='w-24 p-3 text-sm font-semibold tracking-wide'>Color</th>
                            {/* <th className='w-24 p-3 text-sm font-semibold tracking-wide'>Color</th> */}
                            <th className='w-24 p-3 text-sm font-semibold tracking-wide'>Price</th>
                            {/* <th className='w-24 p-3 text-sm font-semibold tracking-wide'>Stock</th> */}
                            <th className='w-24 p-3 text-sm font-semibold tracking-wide'>ImageUrl</th>
                            <th className='w-24 p-3 text-sm font-semibold tracking-wide'>Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {modules && modules.map((item, index) => (
                            <tr className={index % 2 ? 'bg-gray-5 hover:bg-gray-200' : 'bg-white hover:bg-gray-200'} key={index}>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    <a href="#" className="font-bold text-blue-500 hover:underline">{index + 1}</a>
                                </td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >{item.name || ''}</td>
                                <td className='p-3 text-sm text-gray-700' >{item.description || ''}</td>
                                {/* <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >{item.size.value || ''}</td> */}
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >{item.color.value || ''}</td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >{convertVnd(item.price || '')}</td>
                                {/* <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >{item.stock || '0'}</td> */}
                                {/* <td className='p-3 text-sm text-gray-700 whitespace-nowrap' ><ImageView imageUrl={item.imageUrl} /></td> */}
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >{item.imageUrl ? (
                                    <img className="w-20 h-20 mt-3" src={item.imageUrl} />
                                ) : (
                                    <span>No Image Available</span>
                                )}</td>
                                <td className='p-3' >
                                    <button type='button'><MdEdit size={30} className='mr-3 hover:text-text text-yellow-400' onClick={() => handleUpdate(item)} /></button>
                                    <button type='button'><MdDelete size={30} className='mr-3 hover:text-text text-red-400' onClick={() => handleDelete(item["id"], item.imageUrl)} /></button>
                                    <button type='button'><FaWarehouse size={30} className='mr-3 hover:text-text text-green-400' onClick={() => handleUpdateSAS(item)} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden text-left'>
                {modules && modules.map((item, index) => (
                    <div className='bg-white space-y-3 p-4 rounded-lg shadow' key={index}>
                        <div className='flex items-center space-x-2 text-sm'>
                            <div>
                                <a href="#" className="text-blue-500 font-bold hover:underline">{index + 1}</a>
                            </div>
                            <div className='text-gray-500'>{item.name || ''}</div>
                            <div className='text-gray-500'>{item.description || ''}</div>
                            {/* <div className='text-gray-500'>{item.size.value || ''}</div> */}
                            <div className='text-gray-500'>{item.color.value || ''}</div>
                            <div className='text-gray-500'>{item.price || ''}</div>
                            <div className='text-gray-500'>{item.stock || ''}</div>
                            <div className='text-gray-500'>{item.imageUrl || ''}</div>
                        </div>
                        <div className='text-sm font-medium text-black flex'>
                            <MdEdit size={20} color='green' className='mr-3' />
                            <MdDelete color='red' size={20} />
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-end items-cente my-3">
                <Paginate onPageChange={handlePageChange} pageCount={totalPages.current} forcePage={selectedPage}></Paginate>
            </div>
            <EditPage
                module={selectedModule}
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onUpdate={handleModuleUpdate}
                titleName={titleName}
                navigate={navigate}
            />
            <EditSizeStockPage
                module={selectedModuleSAS}
                isOpen={isPopupOpenSAS}
                onClose={() => setIsPopupOpenSAS(false)}
                onUpdate={handleModuleUpdateSAS}
            />
            {popup.isOpen && (
                <PopupReponse
                    type={popup.type}
                    message={popup.message}
                    onClose={handleClosePopup}
                    closeButton={popup.closeButton}
                // Quyết định có nút đóng hay không
                />
            )}
        </div>
    );
};

export default ProductPage;