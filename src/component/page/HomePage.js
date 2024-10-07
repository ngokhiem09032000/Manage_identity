import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItems } from '../../service/serviceManage';
import { MdDelete, MdEdit } from 'react-icons/md';

const HomePage = () => {

    const [modules, setModules] = useState([]);
    const navigate = useNavigate();

    const fetchModules = async () => {
        try {
            const data = await getItems("/users", navigate);
            console.log(data);
            if (data && data.code === 1000 && data.result && data.result.length > 0) {
                setModules(data.result);
            }
        } catch (error) {
            console.error('Error fetching modules:', error);
        }
    };

    useEffect(() => {
        fetchModules();
    }, []);

    return (
        <div className='pl-20 pr-2 h-screen bg-gray-100'>
            <h1 className='text-xl mb-2'>Home</h1>
        </div>
    );
};

export default HomePage;