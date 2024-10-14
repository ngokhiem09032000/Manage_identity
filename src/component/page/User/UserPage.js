import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { create, getItems, remove, update } from '../../../service/serviceManage';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import EditPage from './EditPage';
import PopupReponse from '../../element/PopupReponse';
import { castDate, castModule, mapModuleListUser } from '../../../tool/ToolAll';
import { IoMdAddCircle } from 'react-icons/io';
import ReactPaginate from 'react-paginate';
import Paginate from '../../element/Paginate';
import SearchBox from '../../element/SearchBox';

const UserPage = () => {

    const [modules, setModules] = useState([]);
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [titleName, setTitleName] = useState("");
    const [popup, setPopup] = useState({ isOpen: false, message: "", type: "" });
    const [selectedModule, setSelectedModule] = useState(null);

    // phần paginate
    const [keySearch, setKeySearch] = useState("");
    const [selectedPage, setSelectedPage] = useState(0);
    const itemsPerPage = 10; // Hiển thị 3 người trên mỗi trang
    // const totalPages = Math.ceil(modules.length / itemsPerPage);
    let totalPages = useRef(0);

    // Hàm xử lý khi thay đổi trang
    const handlePageChange = ({ selected }) => {
        fetchModules(keySearch, selected);
    };
    // phần paginate

    const createModuleData = {
        id: null,
        userName: '',
        passWord: '12345678',
        fullName: '',
        birthDate: '2000-01-01',
        roles: []
    }

    const fetchModules = async (keySearch, page) => {
        try {
            const data = await getItems(navigate, keySearch, page, itemsPerPage);
            console.log(data);
            if (data && data.code === 1000 && data.result && data.result.content) {
                totalPages.current = data.result.totalPages;
                const transformedData = mapModuleListUser(data.result.content);
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

    const handleModuleUpdate = async (updatedModule) => {
        let reponse = "";
        const updatedModuleCast = { ...updatedModule, roles: updatedModule.roles ? updatedModule.roles.map(r => r.value) : [] };
        if (updatedModule.id != null) {
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
        setKeySearch("");
        fetchModules("", 0);
    };

    const handleDelete = async (id) => {
        // Xử lý xóa người dùng
        const reponse = await remove(id, navigate);
        setPopup({
            isOpen: true,
            message: reponse.message ? reponse.message : "Success!",
            type: reponse.message ? "error" : "success",
            closeButton: false,
        });
        setKeySearch("");
        fetchModules("", 0);
    };

    const handleClosePopup = () => {
        setPopup({ ...popup, isOpen: false });
    };

    return (
        <div className='pl-20 pr-2 h-screen bg-gray-100 pt-5'>
            <div className='text-2xl text-text bg-secondary rounded pl-3 h-16 columns-2'>
                <h1 className='text-left font-bold' style={{ lineHeight: '4rem' }}>Manage User</h1>
                <div className="flex justify-center items-center h-12 mt-2 mr-2 float-end bg-green-500 rounded p-2 hover:bg-green-800" onClick={() => handleAdd()}>
                    <IoMdAddCircle size={24} className="text-white" />
                    <span className='text-base text-white'>Create User</span>
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
                            <th className='w-24 p-3 text-sm font-semibold tracking-wide'>User name</th>
                            <th className='w-24 p-3 text-sm font-semibold tracking-wide'>Full name</th>
                            <th className='w-24 p-3 text-sm font-semibold tracking-wide'>Birth date</th>
                            <th className='w-24 p-3 text-sm font-semibold tracking-wide'>Roles</th>
                            <th className='w-24 p-3 text-sm font-semibold tracking-wide'>Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {modules && modules.map((item, index) => (
                            <tr className={index % 2 ? 'bg-gray-5 hover:bg-gray-200' : 'bg-white hover:bg-gray-200'} key={index}>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    <a href="#" className="font-bold text-blue-500 hover:underline">{index + 1}</a>
                                </td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >{item.userName || ''}</td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >{item.fullName || ''}</td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >{castDate(item.birthDate || '')}</td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >{castModule(item.roles)}</td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap flex' >
                                    <MdEdit size={20} className='mr-3 hover:text-text text-yellow-400' onClick={() => handleUpdate(item)} />
                                    <MdDelete size={20} className='mr-3 hover:text-text text-red-400' onClick={() => handleDelete(item["id"])} /></td>
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
                            <div className='text-gray-500'>{item.userName || ''}</div>
                            <div>
                                <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50' >{item.fullName || ''}</span>
                            </div>
                        </div>
                        <div className='text-sm text-gray-700'>{castDate(item.birthDate || '')}</div>
                        <div className='text-sm text-gray-700'>{castModule(item.roles)}</div>
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
            {
                popup.isOpen && (
                    <PopupReponse
                        type={popup.type}
                        message={popup.message}
                        onClose={handleClosePopup}
                        closeButton={popup.closeButton}
                    // Quyết định có nút đóng hay không
                    />
                )
            }
        </div>
    );
};

export default UserPage;