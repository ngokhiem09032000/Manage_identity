import React, { useState, useEffect, useRef } from 'react';
import TextBox from '../../element/TextBox';
import DateBox from '../../element/DateBox';
import SelectCus from '../../element/SelectCus';
import { getItems } from '../../../service/serviceRole';

const EditPage = ({ module, isOpen, onClose, onUpdate, titleName, navigate }) => {

    const [moduleUpdate, setModuleUpdate] = useState({ ...module });
    let listRoles = useRef([]);

    useEffect(() => {
        if (module) {
            setModuleUpdate({ ...module });
        }
        fetchData();
    }, [module]);

    async function fetchData() {
        const listDataGet = await getItems(navigate);
        const options = listDataGet && listDataGet.result && listDataGet.result.map(r => ({
            label: r.description,
            value: r.name
        }));
        // 
        // const options = listDataGet && listDataGet.result ? listDataGet.result.map(r => r.name) : [];
        listRoles.current = options;
    }

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(moduleUpdate);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
            <div className="bg-white p-6 rounded-md shadow-lg w-1/2">
                <h2 className="text-xl font-bold mb-4">{titleName} User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 grid grid-cols-2">
                        <TextBox className='mr-1 mb-2 mt-1' disabled={titleName === 'Create' ? false : true} value={moduleUpdate.userName || ''} labelName="User Name" onChange={(e) => {
                            setModuleUpdate({ ...moduleUpdate, userName: e.target.value })
                        }}></TextBox>
                        <TextBox className='ml-1 mb-2 mt-1' value={moduleUpdate.fullName || ''} labelName="Full Name" onChange={(e) => {
                            setModuleUpdate({ ...moduleUpdate, fullName: e.target.value })
                        }}></TextBox>
                        <DateBox className='mr-1 mb-2 mt-1' value={moduleUpdate.birthDate || ''} labelName="Birth Date" onChange={(e) => {
                            setModuleUpdate({ ...moduleUpdate, birthDate: e.target.value })
                        }}></DateBox>
                        <SelectCus className='ml-1 mb-2 mt-1' value={moduleUpdate.roles || ''} labelName="Roles" onChange={(e) => {
                            setModuleUpdate({ ...moduleUpdate, roles: e })
                        }} options={listRoles.current} placeholder="Select roles" isMulti></SelectCus>
                    </div>
                    <div className="flex justify-end space-x-2 mt-10">
                        <button
                            type="button"
                            className="bg-button text-white px-4 py-2 rounded hover:bg-accent"
                            onClick={onClose}
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
