import React, { useState, useEffect } from 'react';
import TextBox from '../../element/TextBox';

const EditPage = ({ module, isOpen, onClose, onUpdate, titleName, navigate }) => {

    const [moduleUpdate, setModuleUpdate] = useState({ ...module });

    useEffect(() => {
        if (module) {
            setModuleUpdate({ ...module });
        }
    }, [module]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(moduleUpdate, titleName === 'Create' ? true : false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
            <div className="bg-white p-6 rounded-md shadow-lg w-1/2">
                <h2 className="text-xl font-bold mb-4">{titleName} Permission</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 grid grid-cols-2">
                        <TextBox className='mr-1 mb-2 mt-1' disabled={titleName === 'Create' ? false : true} value={moduleUpdate.name || ''} labelName="Permission Name" onChange={(e) => {
                            setModuleUpdate({ ...moduleUpdate, name: e.target.value })
                        }}></TextBox>
                        <TextBox className='ml-1 mb-2 mt-1' value={moduleUpdate.description || ''} labelName="Description" onChange={(e) => {
                            setModuleUpdate({ ...moduleUpdate, description: e.target.value })
                        }}></TextBox>
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
